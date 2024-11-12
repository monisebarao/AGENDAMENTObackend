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

<<<<<<< HEAD
router.get("/", salaConsultaController.createSalaConsulta);
=======
router.get("/id: 1", salaConsultaController.getConsultaLMT);

router.get("/id: 2", salaConsultaController.getConsultaMaker);

router.get("/id: 3", salaConsultaController.getConsultaBiblioteca);

router.get("/id: 4", salaConsultaController.getConsultaBioquimica);

router.get("/id: 5", salaConsultaController.getConsultaFisica);

router.get("/id: 5", salaConsultaController.getConsultaSenai);
>>>>>>> b4302de1ecc1231b4674ee801d3c277277527896

// Exporta o roteador para que ele possa ser usado na aplicação principal (app.js)
module.exports = router;