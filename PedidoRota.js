const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM pedidos';
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });

router.post('/', (req, res) => {
  const pedido = req.body;
  const sql = 'INSERT INTO pedidos SET ?';
  db.query(sql, pedido, (err, result) => {
    if (err) throw err;
    res.status(201).json({ message: 'Pedido criado com sucesso' });
  });
});


router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM pedidos WHERE id = ?';
  db.query(sql, id, (err, result) => {
    if (err) throw err;
    res.json({ message: `Pedido ${id} excluído com sucesso` });
  });
});

module.exports = router;
