const express = require("express");
const router = express.Router();
const { v4 } = require("uuid");
const fs = require("fs");

const readFile = () => {
  content = fs.readFileSync("./database/db.json", "utf-8");
  return JSON.parse(content);
};
const writeFile = (content) => {
  const updateFile = JSON.stringify(content);
  fs.writeFileSync("./database/db.json", updateFile, "utf-8");
};

router.get("/funcionarios", (req, res) => {
  const content = readFile();
  res.json(content[1]);
});

router.get("/funcionarios/:id", (req, res) => {
  const { id } = req.params;
  const content = readFile();
  const func = content[1].find((func) => func.id == id);
  res.json(func);
});

router.post("/funcionarios/add", (req, res) => {
  const { nome, sobrenome, cargo, telefone } = req.body;
  const id = v4();

  currentContent = readFile();
  currentContent[1].push({ nome, sobrenome, cargo, telefone, id });
  writeFile(currentContent);
  res.status(201).json({ nome, sobrenome, cargo, telefone, id });
});

router.put("/funcionarios/att/:id", (req, res) => {
  const { id } = req.params;

  const { nome, sobrenome, cargo, telefone } = req.body;

  const currentContent = readFile();
  const funcIndex = currentContent[1].findIndex((func) => func.id == id);

  const {
    nome: cNome,
    sobrenome: cSobrenome,
    cargo: cCargo,
    telefone: cTelefone,
    id: cId,
  } = currentContent[1][funcIndex];

  const updateFunc = {
    nome: nome ? nome : cNome,
    sobrenome: sobrenome ? sobrenome : cSobrenome,
    cargo: cargo ? cargo : cCargo,
    telefone: telefone ? telefone : cTelefone,
    id: cId,
  };
  currentContent[1][funcIndex] = updateFunc;
  writeFile(currentContent);

  res.json(updateFunc);
});

router.delete("/funcionarios/del/:id", (req, res) => {
  const { id } = req.params;
  const currentContent = readFile();
  const funcIndex = currentContent[1].findIndex((func) => func.id == id);
  currentContent[1].splice(funcIndex, 1);
  writeFile(currentContent);
  res.status(204).send();
});

module.exports = router;
