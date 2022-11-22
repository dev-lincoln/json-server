const express = require("express");
const app = express();
const { uuid } = require("uuidv4");

const fs = require("fs");

const readFile = () => {
  content = fs.readFileSync("./database/bd.json", "utf-8");
  return JSON.parse(content);
};
const writeFile = (content) => {
  const updateFile = JSON.stringify(content);
  fs.writeFileSync("./database/bd.json", updateFile, "utf-8");
};
const port = 3000;

app.get("/alunos", (req, res) => {
  const content = readFile();
  res.json(content);
});

app.get("/alunos/:id", (req, res) => {
  const { id } = req.params;
  const content = readFile();
  const user = content.find((user) => user.id == id);
  res.json(user);
});

app.post("/alunos", (req, res) => {
  const { nome, idade } = req.body;
  const id = uuid();

  const newUser = {
    nome,
    idade,
    id,
  };

  currentContent = readFile();
  currentContent.push(newUser);
  writeFile(currentContent);
  res.status(201).json(newUser);
});

app.put("/alunos/:id", (req, res) => {
  const { id } = req.params;
  const { nome, idade } = req.body;
  const currentContent = readFile();
  const userIndex = currentContent.findIndex((user) => user.id == id);
  currentContent[userIndex].nome = nome;
  currentContent[userIndex].idade = idade;
  writeFile(currentContent);

  res.json(currentContent[userIndex]);
});

app.delete("/alunos/:id", (req, res) => {
  const { id } = req.params;
  const currentContent = readFile();
  const userIndex = currentContent.findIndex((user) => user.id == id);
  currentContent.splice(userIndex, 1);
  writeFile(currentContent);
  res.status(204).send();
});

app.listen(port, () => {
  console.log("Servidor online");
});
