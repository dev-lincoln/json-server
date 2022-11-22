const express = require("express");
const router = express.Router();
const { uuid } = require("uuidv4");
const fs = require("fs");

const readFile = () => {
  content = fs.readFileSync("./database/funcionarios.json", "utf-8");
  return JSON.parse(content);
};
const writeFile = (content) => {
  const updateFile = JSON.stringify(content);
  fs.writeFileSync("./database/funcionarios.json", updateFile, "utf-8");
};

router.get("/funcionarios", (req, res) => {
  const content = readFile();
  res.json(content);
});

router.get("/funcionarios/:id", (req, res) => {
  const { id } = req.params;
  const content = readFile();
  const func = content.find((func) => func.id == id);
  res.json(func);
});

router.post("/funcionarios/add", (req, res) => {
  const { nome, sobrenome, cargo, telefone } = req.body;
  const id = uuid();

  const newFunc = {
    nome,
    sobrenome,
    cargo,
    telefone,
    id,
  };

  currentContent = readFile();
  currentContent.push(newFunc);
  writeFile(currentContent);
  res.status(201).json(newFunc);
});

router.put("/funcionarios/att/:id", (req, res) => {
  const { id } = req.params;
  const { nome, sobrenome, cargo, telefone } = req.body;
  const currentContent = readFile();
  const funcIndex = currentContent.findIndex((func) => func.id == id);
  currentContent[funcIndex].nome = nome;
  currentContent[funcIndex].sobrenome = sobrenome;
  currentContent[funcIndex].cargo = cargo;
  currentContent[funcIndex].telefone = telefone;
  writeFile(currentContent);

  res.json(currentContent[funcIndex]);
});

router.delete("/funcionarios/del/:id", (req, res) => {
  const { id } = req.params;
  const currentContent = readFile();
  const funcIndex = currentContent.findIndex((func) => func.id == id);
  currentContent.splice(funcIndex, 1);
  writeFile(currentContent);
  res.status(204).send();
});

module.exports = router;
