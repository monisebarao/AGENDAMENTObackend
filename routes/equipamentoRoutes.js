const express = require('express');
const router = express.Router();
const equipamentoController = require('../controllers/agendaController');


router.get('/', equipamentoController.getAllEquipamento);
// Rota para criar um novo cliente
router.post('/', equipamentoController.createEquipamento);
// Rota para atualizar um cliente existente
router.put('/', equipamentoController.updateEquipamento);
// Rota para deletar um cliente
router.delete('/', equipamentoController.deleteEquipamento);

module.exports = router;