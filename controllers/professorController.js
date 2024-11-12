// controllers/agendamentoController.js

// Importa o modelo de usuário que contém a lógica de interação com o banco de dados
const professorModel = require("../models/professorModel");

// Função para obter todos os usuários
async function getAllProfessor(req, res) {
  try {
    // Chama o método do modelo para obter todos os usuários do banco de dados
    const professor = await professorModel.getAllProfessor();
    
    // Retorna a lista de usuários em formato JSON
    res.json(professor);
  } catch (err) {
    // Exibe o erro no console, se houver, e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao obter os professores");
  }
}

// Função para obter um usuário específico pelo ID
async function getProfessor(req, res) {
  // Extrai o ID do usuário da requisição (usado na URL: /users/:id)
  const id = req.params.id;
  try {
    // Chama o método do modelo para obter o usuário com base no ID fornecido
    const professor = await professorModel.getProfessorById(id);
    
    // Se o usuário não for encontrado, retorna um status 404 (não encontrado)
    if (!professor) {
      res.status(404).send("Professor(a) não encontrado(a)");
    } else {
      // Se o usuário for encontrado, retorna os dados em formato JSON
      res.json(professor);
    }
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao obter o(a) professor(a)");
  }
}

// Função para criar um novo usuário
async function createProfessor(req, res) {
  // Extrai as informações do novo usuário a partir do corpo da requisição (name, email, age)
  const {id_prof,nif_prof, nome_prof } = req.body;
  try {
    // Chama o método do modelo para criar o novo usuário com os dados fornecidos
    await professorModel.createProfessor(id_prof,nif_prof, nome_prof);
    
    // Retorna um status 201 (criado com sucesso)
    res.status(201).send("Professor(a) criado com sucesso");
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao criar o(a) professor(a)");
  }
}

// Função para atualizar um usuário existente
async function updateProfessor(req, res) {
  // Extrai o ID do usuário da URL e os novos dados do corpo da requisição
  const id_prof = req.params.id;
  const { nif_prof, nome_prof } = req.body;
  try {
    // Chama o método do modelo para atualizar o usuário com base no ID e nos dados fornecidos
   if (!id_prof){
    res.status(400).send({message: 'Dados incompletos'}); return;  }
    await professorModel.updateProfessor(id_prof,nif_prof, nome_prof);
    
    // Retorna uma mensagem de sucesso após a atualização
    res.send("Professor(a) atualizado(a) com sucesso");
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao atualizar o professor");
  }
}

// Função para deletar um usuário
async function deleteProfessor(req, res) {
  // Extrai o ID do usuário da URL
  const id = req.params.id;
  try {
    // Chama o método do modelo para deletar o usuário com base no ID fornecido
    await professorModel.deleteProfessor(id);
    
    // Retorna uma mensagem de sucesso após a exclusão
    res.send("Professor deletado com sucesso");
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao deletar o professor");
  }
}

// Exporta as funções do controller para serem usadas nas rotas da aplicação
module.exports = {
  getAllProfessor,
  getProfessor,
  createProfessor,
  updateProfessor,
  deleteProfessor,
};