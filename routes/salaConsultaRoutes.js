// routes/users.js

// Importa o módulo "express" para criar um roteador
const express = require("express");

// Cria uma nova instância do roteador do Express
const router = express.Router();

// Importa o controller de usuários que contém a lógica para cada rota
const salaConsultaController = require("../controllers/salaConsultaController");

// Rota GET para obter todos os usuários
// Chama o método "getUsers" do controller quando a rota raiz "/users" for acessada
router.get("/", salaConsultaController.getAllSalaConsulta);

router.get("/", salaConsultaController.createSalaConsulta);

router.get("/:cod_sala", salaConsultaController.getAgenda1BySala);

router.get("/:data_sel1", salaConsultaController.getAgenda1ByData);

module.exports = router;