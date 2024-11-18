// routes/users.js

// Importa o módulo "express" para criar um roteador
const express = require("express");

// Cria uma nova instância do roteador do Express
const router = express.Router();

// Importa o controller de usuários que contém a lógica para cada rota
const salaController = require("../controllers/salaController");

// Rota GET para obter todos os usuários
// Chama o método "getUsers" do controller quando a rota raiz "/users" for acessada
router.get("/", salaController.getAllSala);

// Rota GET para obter um usuário específico pelo ID
// Chama o método "getUser" do controller ao acessar "/sala/:id", onde ":id" é o ID do usuário
router.get("/:id", salaController.getSala);

// Rota POST para criar um novo usuário
// Chama o método "createUser" do controller ao acessar "/sala" com dados no corpo da requisição
router.post("/:id", salaController.createSala);

// Rota PUT para atualizar um usuário existente pelo ID
// Chama o método "updateUser" do controller ao acessar "/sala/:id" e fornecer novos dados no corpo da requisição
router.put("/:id", salaController.updateSala);

// Rota DELETE para deletar um usuário específico pelo ID
// Chama o método "deleteUser" do controller ao acessar "/sala/:id"
router.delete("/:id", salaController.deleteSala);

// Exporta o roteador para que ele possa ser usado na aplicação principal (app.js)
module.exports = router;