const express = require('express');
const router = express.Router();
const salaController = require('../controllers/salaController');

router.get('/', salaController.getAllSala);
// Rota para criar um novo cliente
router.post('/', salaController.createSala);
// Rota para atualizar um cliente existente
router.put('/:id', salaController.updateSala);
// Rota para deletar um cliente
router.delete('/:id', salaController.deleteSala);

module.exports = router;