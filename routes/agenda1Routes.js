// Importa o módulo "express" para criar um roteador
const express = require("express");

// Cria uma nova instância do roteador do Express
const router = express.Router();

// Importa o controller de agendamentos que contém a lógica para cada rota
const agenda1Controller = require("../controllers/agenda1Controller");

// Rota GET para obter todos os agendamentos
router.get("/", agenda1Controller.getAllAgenda1);

// Rota GET para obter um agendamento específico pelo ID
router.get("/:id", agenda1Controller.getAgenda1);

// Rota POST para criar um novo agendamento
router.post("/:id", agenda1Controller.createAgenda1);

// Rota PUT para atualizar um agendamento existente pelo ID
router.put("/:id", agenda1Controller.updateAgenda1);

// Rota DELETE para deletar um agendamento específico pelo ID
router.delete("/:id", agenda1Controller.deleteAgenda1);

// Exporta o roteador para que ele possa ser usado na aplicação principal (app.js)
module.exports = router;