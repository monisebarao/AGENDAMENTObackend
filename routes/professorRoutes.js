const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professorController');

router.get('/', professorController.getAllProfessor);
// Rota para criar um novo cliente
router.post('/', professorController.createProfessor);
// Rota para atualizar um cliente existente
router.put('/:id', professorController.updateProfessor);
// Rota para deletar um cliente
router.delete('/:id', professorController.deleteProfessor);

module.exports = router;

