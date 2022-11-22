const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;

const funcionarioRouter = require("./routes/funcionarios");
const clienteRouter = require("./routes/clientes");
const quartoRouter = require("./routes/quartos");

app.use("/", funcionarioRouter);
app.use("/", clienteRouter);
app.use("/", quartoRouter);


app.listen(port, () => {
  console.log("Servidor online");
});
