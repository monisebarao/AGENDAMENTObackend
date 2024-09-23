const express = require('express');
const router = express.Router();
const agendaController = require('../controllers/agendaController');
// lembrando que a rota raiz tem clientes, definido no app.js
// Rota para obter todos os clientes
router.get('/', agendaController.getAllAgenda);
// Rota para criar um novo cliente
router.post('/', agendaController.createAgenda);
// Rota para atualizar um cliente existente
router.put('/:id', agendaController.updateAgenda);
// Rota para deletar um cliente
router.delete('/:id', agendaController.deleteAgenda);







module.exports = router;