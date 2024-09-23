const express = require('express');
const router = express.Router();
const agendaController = require('../controllers/agendaController');
const salaController = require('../controllers/agendaController');
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
router.post('/', agendaController.createSala);
// Rota para atualizar um cliente existente
router.put('/:id', agendaController.updateSala);
// Rota para deletar um cliente
router.delete('/:id', agendaController.deleteSala);

router.get('/', agendaController.getAllEquipamento);
// Rota para criar um novo cliente
router.post('/', agendaController.createEquipamento);
// Rota para atualizar um cliente existente
router.put('/', agendaController.updateEquipamento);
// Rota para deletar um cliente
router.delete('/', agendaController.deleteEquipamento);

router.get('/', agendaController.getAllProfessor);
// Rota para criar um novo cliente
router.post('/', agendaController.createProfessor);
// Rota para atualizar um cliente existente
router.put('/:id', agendaController.updateProfessor);
// Rota para deletar um cliente
router.delete('/:id', agendaController.deleteProfessor);

module.exports = router;