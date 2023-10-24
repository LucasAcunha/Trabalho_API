const express = require('express');
const router = express.Router();
const db = require('./db');

router.post('/:pedido_id/:produto_id', (req, res) => {
  const {pedido_id, produto_id} = req.params;  
  const {preco, quantidade } = req.body;

  if (isNaN(pedido_id) || isNaN(produto_id)) {
    return res.status(400).json({ message: 'Pedido_id e produto_id devem ser números.' });
  }

  const sql = 'INSERT INTO pedidos_produtos SET ?';
  const pedido_produto = { pedido_id, produto_id, preco, quantidade };
  db.query(sql, pedido_produto, (err, result) => {
    if (err) throw err;
    res.status(201).json({ message: 'Pedido_Produto criado com sucesso' });
  });
});

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM pedidos_produtos';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

router.delete('/:pedido_id/:produto_id', (req, res) => {
    const { pedido_id, produto_id } = req.params;
  
    if (isNaN(pedido_id) || isNaN(produto_id)) {
      return res.status(400).json({ message: 'Pedido_id e produto_id devem ser números.' });
    }
  
    const checkSql = 'SELECT * FROM pedidos_produtos WHERE pedido_id = ? AND produto_id = ?';
    db.query(checkSql, [pedido_id, produto_id], (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        return res.status(404).json({ message: `Pedido_Produto ${pedido_id}/${produto_id} não encontrado.` });
      }
  
      const deleteSql = 'DELETE FROM pedidos_produtos WHERE pedido_id = ? AND produto_id = ?';
      db.query(deleteSql, [pedido_id, produto_id], (err, result) => {
        if (err) throw err;
        res.json({ message: `Pedido_Produto ${pedido_id}/${produto_id} excluído com sucesso` });
      });
    });
  });
  

module.exports = router;
