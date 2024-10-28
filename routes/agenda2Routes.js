// Importa o módulo "express" para criar um roteador
const express = require("express");

// Cria uma nova instância do roteador do Express
const router = express.Router();

// Importa o controller de agendamentos que contém a lógica para cada rota
const agenda2Controller = require("../controllers/agenda2Controller");

// Rota GET para obter todos os agendamentos
router.get("/", agenda2Controller.getAllAgenda2);

// Rota GET para obter um agendamento específico pelo ID
router.get("/:id", agenda2Controller.getAgenda2);

// Rota POST para criar um novo agendamento
router.post("/", agenda2Controller.createAgenda2);

// Rota PUT para atualizar um agendamento existente pelo ID
router.put("/:id", agenda2Controller.updateAgenda2);

// Rota DELETE para deletar um agendamento específico pelo ID
router.delete("/:id", agenda2Controller.deleteAgenda2);

// Rota GET para obter um agendamento específico pelo ID
router.get("/data/:data", agenda2Controller.getAgenda2ByData);

// Exporta o roteador para que ele possa ser usado na aplicação principal (app.js)
module.exports = router;