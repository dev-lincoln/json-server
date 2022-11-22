const express = require("express");
const router = express.Router();
const { v4 } = require("uuid");
const fs = require("fs");

const readFile = () => {
  content = fs.readFileSync("./database/clientes.json", "utf-8");
  return JSON.parse(content);
};
const writeFile = (content) => {
  const updateFile = JSON.stringify(content);
  fs.writeFileSync("./database/clientes.json", updateFile, "utf-8");
};

router.get("/clientes", (req, res) => {
  const content = readFile();
  res.json(content);
});

router.get("/clientes/:id", (req, res) => {
  const { id } = req.params;
  const content = readFile();
  const cliente = content.find((func) => func.id == id);
  res.json(cliente);
});

router.post("/clientes/add", (req, res) => {
  const { nome, sobrenome, sexo, telefone, email } = req.body;
  const id = v4();

  currentContent = readFile();
  currentContent.push({ nome, sobrenome, sexo, telefone, email, id });
  writeFile(currentContent);
  res.status(201).json({ nome, sobrenome, sexo, telefone, email, id });
});

router.put("/clientes/att/:id", (req, res) => {
  const { id } = req.params;

  const { nome, sobrenome, sexo, telefone, email } = req.body;

  const currentContent = readFile();
  const clienteIndex = currentContent.findIndex((cliente) => cliente.id == id);

  const {
    nome: cNome,
    sobrenome: cSobrenome,
    sexo: cSexo,
    telefone: cTelefone,
    email: cEmail,
    id: cId
  } = currentContent[clienteIndex];

  const updateCliente = {
    nome: nome ? nome : cNome,
    sobrenome: sobrenome ? sobrenome : cSobrenome,
    sexo: sexo ? cargo : cSexo,
    telefone: telefone ? telefone : cTelefone,
    email: email ? email: cEmail,
    id: cId,
  };
  currentContent[clienteIndex] = updateCliente;
  writeFile(currentContent);

  res.json(updateCliente);
});

router.delete("/clientes/del/:id", (req, res) => {
  const { id } = req.params;
  const currentContent = readFile();
  const clienteIndex = currentContent.findIndex((cliente) => cliente.id == id);
  currentContent.splice(clienteIndex, 1);
  writeFile(currentContent);
  res.status(204).send();
});

module.exports = router;
