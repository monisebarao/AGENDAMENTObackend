const express = require('express');
const router = express.Router();
const agendaController = require('../controllers/agendaController');
const salaController = require('../controllers/agendaController');
const equipamentoController = require('../controllers/agendaController');
const professorController = require('../controllers/agendaController');
// lembrando que a rota raiz tem clientes, definido no app.js
// Rota para obter todos os clientes
router.get('/', agendaController.getAllAgenda);
// Rota para criar um novo cliente
router.post('/', agendaController.createAgenda);
// Rota para atualizar um cliente existente
router.put('/:id', agendaController.updateAgenda);
// Rota para deletar um cliente
router.delete('/:id', agendaController.deleteAgenda);

router.get('/', salaController.getAllSala);
// Rota para criar um novo cliente
router.post('/', salaController.createSala);
// Rota para atualizar um cliente existente
router.put('/:id', salaController.updateSala);
// Rota para deletar um cliente
router.delete('/:id', salaController.deleteSala);

router.get('/', equipamentoController.getAllEquipamento);
// Rota para criar um novo cliente
router.post('/', equipamentoController.createEquipamento);
// Rota para atualizar um cliente existente
router.put('/', equipamentoController.updateEquipamento);
// Rota para deletar um cliente
router.delete('/', equipamentoController.deleteEquipamento);

router.get('/', professorController.getAllProfessor);
// Rota para criar um novo cliente
router.post('/', professorController.createProfessor);
// Rota para atualizar um cliente existente
router.put('/:id', professorController.updateProfessor);
// Rota para deletar um cliente
router.delete('/:id', professorController.deleteProfessor);

module.exports = router;