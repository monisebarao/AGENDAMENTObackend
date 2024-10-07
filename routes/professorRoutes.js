// Importa o módulo "express" para criar um roteador
const express = require("express");

// Cria uma nova instância do roteador do Express
const router = express.Router();

// Importa o controller de agendamentos que contém a lógica para cada rota
const professorController = require("../controllers/professorController");

// Rota GET para obter todos os agendamentos
router.get("/", professorController.getAllProfessor);

// Rota GET para obter um agendamento específico pelo ID
router.get("/:id", professorController.getProfessor);

// Rota POST para criar um novo agendamento
router.post("/", professorController.createProfessor);

// Rota PUT para atualizar um agendamento existente pelo ID
router.put("/:id", professorController.updateProfessor);

// Rota DELETE para deletar um agendamento específico pelo ID
router.delete("/:id", professorController.deleteProfessor);

// Exporta o roteador para que ele possa ser usado na aplicação principal (app.js)
module.exports = router;