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

router.get("/quartos", (req, res) => {
  const content = readFile();
  res.json(content[2]);
});

router.get("/quartos/:id", (req, res) => {
  const { id } = req.params;
  const content = readFile();
  const quarto = content[2].find((quarto) => quarto.id == id);
  res.json(quarto);
});

router.post("/quartos/add", (req, res) => {
  const { id, tipo, cama, ocupado, preco, foto } = req.body;
  currentContent = readFile();
  currentContent[2].push({ id, tipo, cama, ocupado, preco, foto  });
  writeFile(currentContent);
  res.status(201).json({ id, tipo, cama, ocupado, preco, foto });
});

router.put("/quartos/att/:id", (req, res) => {
  const { id: pId } = req.params;

  const { id, tipo, cama, ocupado, preco, foto } = req.body;

  const currentContent = readFile();
  const quartoIndex = currentContent[2].findIndex((quarto) => quarto.id == Number(pId));

  const {
    id: cId,
    tipo: cTipo,
    cama: cCama,
    ocupado: cOcupado,
    preco: cPreco,
    foto: cFoto
  } = currentContent[2][quartoIndex];

  const updateQuarto = {
    id: id ? id: cId,
    tipo: tipo ? tipo : cTipo,
    cama: cama ? cama : cCama,
    ocupado: ocupado ? ocupado : cOcupado,
    preco: preco ? preco : cPreco,
    foto: foto ? foto : cFoto
  };
  currentContent[2][quartoIndex] = updateQuarto;
  writeFile(currentContent);

  res.json(updateQuarto);
});

router.delete("/quartos/del/:id", (req, res) => {
  const { id } = req.params;
  const currentContent = readFile();
  const quartoIndex = currentContent[2].findIndex((quarto) => quarto.id == Number(id));
  currentContent[2].splice(quartoIndex, 1);
  writeFile(currentContent);
  res.status(204).send();
});

module.exports = router;
