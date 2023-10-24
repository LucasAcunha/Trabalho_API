const express = require('express');
const app = express();
const port = 3000;


const clienteRoutes = require('./ClienteRota');
const produtoRoutes = require('./ProdRota');
const pedidoRoutes = require('./PedidoRota');
const pedidoProdutoRoutes = require('./pedido_produtoRota');



const db = require('./db');

app.use(express.json());


app.use('/cliente', clienteRoutes);
app.use('/produto', produtoRoutes);
app.use('/pedido', pedidoRoutes);
app.use('/pedido_produto', pedidoProdutoRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
