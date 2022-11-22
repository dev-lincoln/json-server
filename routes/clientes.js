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

router.get("/clientes", (req, res) => {
  const content = readFile();
  res.json(content[0]);
});

router.get("/clientes/:id", (req, res) => {
  const { id } = req.params;
  const content = readFile();
  const cliente = content[0].find((func) => func.id == id);
  res.json(cliente);
});

router.post("/clientes/add", (req, res) => {
  const { nome, sobrenome, sexo, telefone, email } = req.body;
  const id = v4();

  currentContent = readFile();
  currentContent[0].push({ nome, sobrenome, sexo, telefone, email, id });
  writeFile(currentContent);
  res.status(201).json({ nome, sobrenome, sexo, telefone, email, id });
});

router.put("/clientes/att/:id", (req, res) => {
  const { id } = req.params;

  const { nome, sobrenome, sexo, telefone, email } = req.body;

  const currentContent = readFile();
  const clienteIndex = currentContent[0].findIndex((cliente) => cliente.id == id);

  const {
    nome: cNome,
    sobrenome: cSobrenome,
    sexo: cSexo,
    telefone: cTelefone,
    email: cEmail,
    id: cId
  } = currentContent[0][clienteIndex];

  const updateCliente = {
    nome: nome ? nome : cNome,
    sobrenome: sobrenome ? sobrenome : cSobrenome,
    sexo: sexo ? cargo : cSexo,
    telefone: telefone ? telefone : cTelefone,
    email: email ? email: cEmail,
    id: cId,
  };
  currentContent[0][clienteIndex] = updateCliente;
  writeFile(currentContent);

  res.json(updateCliente);
});

router.delete("/clientes/del/:id", (req, res) => {
  const { id } = req.params;
  const currentContent = readFile();
  const clienteIndex = currentContent[0].findIndex((cliente) => cliente.id == id);
  currentContent[0].splice(clienteIndex, 1);
  writeFile(currentContent);
  res.status(204).send();
});

module.exports = router;
