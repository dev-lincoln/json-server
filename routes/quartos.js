const express = require("express");
const router = express.Router();
const { v4 } = require("uuid");
const fs = require("fs");

const readFile = () => {
  content = fs.readFileSync("./database/quartos.json", "utf-8");
  return JSON.parse(content);
};
const writeFile = (content) => {
  const updateFile = JSON.stringify(content);
  fs.writeFileSync("./database/quartos.json", updateFile, "utf-8");
};

router.get("/quartos", (req, res) => {
  const content = readFile();
  res.json(content);
});

router.get("/quartos/:id", (req, res) => {
  const { id } = req.params;
  const content = readFile();
  const quarto = content.find((quarto) => quarto.id == id);
  res.json(quarto);
});

router.post("/quartos/add", (req, res) => {
  const { id, tipo, cama, ocupado, preco } = req.body;
  currentContent = readFile();
  currentContent.push({ id, tipo, cama, ocupado, preco  });
  writeFile(currentContent);
  res.status(201).json({ id, tipo, cama, ocupado, preco  });
});

router.put("/quartos/att/:id", (req, res) => {
  const { id: pId } = req.params;

  const { id, tipo, cama, ocupado, preco } = req.body;

  const currentContent = readFile();
  const quartoIndex = currentContent.findIndex((quarto) => quarto.id == Number(pId));

  const {
    id: cId,
    tipo: cTipo,
    cama: cCama,
    ocupado: cOcupado,
    preco: cPreco,
  } = currentContent[quartoIndex];

  const updateQuarto = {
    id: id ? id: cId,
    tipo: tipo ? tipo : cTipo,
    cama: cama ? cama : cCama,
    ocupado: ocupado ? ocupado : cOcupado,
    preco: preco ? preco : cPreco
  };
  currentContent[quartoIndex] = updateQuarto;
  writeFile(currentContent);

  res.json(updateQuarto);
});

router.delete("/quartos/del/:id", (req, res) => {
  const { id } = req.params;
  const currentContent = readFile();
  const quartoIndex = currentContent.findIndex((quarto) => quarto.id == Number(id));
  currentContent.splice(quartoIndex, 1);
  writeFile(currentContent);
  res.status(204).send();
});

module.exports = router;
