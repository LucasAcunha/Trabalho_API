const express = require('express');
const router = express.Router();
const db = require('./db');

router.post('/cadastrar', (req, res) => {
  const cliente = req.body;
  const sql = 'INSERT INTO clientes SET ?';
  db.query(sql, cliente, (err, result) => {
    if (err) throw err;
    res.status(201).json({ message: 'Cliente cadastrado com sucesso' });
  });
});

router.get('/pedidos/', (req, res) => {
  const sql = 'SELECT * FROM pedidos WHERE cliente_id = ?';
  db.query(sql, req.body.cliente_id, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

module.exports = router;
