// controllers/agendamentoController.js

// Importa o modelo de usuário que contém a lógica de interação com o banco de dados
const salaModel = require("../models/salaModel");

// Função para obter todos os usuários
async function getAllSala(req, res) {
  try {
    // Chama o método do modelo para obter todos os usuários do banco de dados
    const sala = await salaModel.getAllSala();
    
    // Retorna a lista de usuários em formato JSON
    res.json(sala);
  } catch (err) {
    // Exibe o erro no console, se houver, e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao obter as salas");
  }
}

// Função para obter um usuário específico pelo ID
async function getSala(req, res) {
  // Extrai o ID do usuário da requisição (usado na URL: /users/:id)
  const id = req.params.id;
  try {
    // Chama o método do modelo para obter o usuário com base no ID fornecido
    const sala = await salaModel.getSalaById(id);
    
    // Se o usuário não for encontrado, retorna um status 404 (não encontrado)
    if (!sala) {
      res.status(404).send("Sala não encontrada");
    } else {
      // Se o usuário for encontrado, retorna os dados em formato JSON
      res.json(sala);
    }
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao obter a sala");
  }
}

// Função para criar um novo usuário
async function createSala(req, res) {
  // Extrai as informações do novo usuário a partir do corpo da requisição (name, email, age)
  const { cod_sala, nome_sala } = req.body;
  try {
    // Chama o método do modelo para criar o novo usuário com os dados fornecidos
    await salaModel.createSala(cod_sala, nome_sala);
    
    // Retorna um status 201 (criado com sucesso)
    res.status(201).send("Sala criada com sucesso");
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao criar a sala");
  }
}

// Função para atualizar um usuário existente
async function updateSala(req, res) {
  // Extrai o ID do usuário da URL e os novos dados do corpo da requisição
  const id = req.params.id;
  const { nome_sala } = req.body;
  try {
    // Chama o método do modelo para atualizar o usuário com base no ID e nos dados fornecidos
    await salaModel.updateSala(id,nome_sala);
    
    // Retorna uma mensagem de sucesso após a atualização
    res.send("Sala atualizada com sucesso");
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao atualizar a sala");
  }
}

// Função para deletar um usuário
async function deleteSala(req, res) {
  // Extrai o ID do usuário da URL
  const id = req.params.id;
  try {
    // Chama o método do modelo para deletar o usuário com base no ID fornecido
    await salaModel.deleteSala(id);
    
    // Retorna uma mensagem de sucesso após a exclusão
    res.send("Sala deletada com sucesso");
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao deletar a sala");
  }
}

// Exporta as funções do controller para serem usadas nas rotas da aplicação
module.exports = {
  getAllSala,
  getSala,
  createSala,
  updateSala,
  deleteSala,
};