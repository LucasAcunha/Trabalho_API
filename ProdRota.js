const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM produtos';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

router.post('/', (req, res) => {
  const produto = req.body;
  const sql = 'INSERT INTO produtos SET ?';
  db.query(sql, produto, (err, result) => {
    if (err) throw err;
    res.status(201).json({ message: 'Produto adicionado com sucesso' });
  });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const produtoAtualizado = req.body;
  const sql = 'UPDATE produtos SET ? WHERE id = ?';
  db.query(sql, [produtoAtualizado, id], (err, result) => {
    if (err) throw err;
    res.json({ message: `Produto ${id} atualizado com sucesso` });
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM produtos WHERE id = ?';
  db.query(sql, id, (err, result) => {
    if (err) throw err;
    res.json({ message: `Produto ${id} excluído com sucesso` });
  });
});

module.exports = router;
