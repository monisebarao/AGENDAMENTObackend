// controllers/agendamentoController.js

// Importa o modelo de usuário que contém a lógica de interação com o banco de dados
const equipamentoModel = require("../models/equipamentoModel");

// Função para obter todos os usuários
async function getAllEquipamento(req, res) {
  try {
    // Chama o método do modelo para obter todos os usuários do banco de dados
    const equipamento = await equipamentoModel.getAllEquipamento();
    
    // Retorna a lista de usuários em formato JSON
    res.json(equipamento);
  } catch (err) {
    // Exibe o erro no console, se houver, e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao obter os equipamentos");
  }
}

// Função para obter um usuário específico pelo ID
async function getEquipamento(req, res) {
  // Extrai o ID do usuário da requisição (usado na URL: /users/:id)
  const id = req.params.id;
  try {
    // Chama o método do modelo para obter o usuário com base no ID fornecido
    const equipamento = await equipamentoModel.getEquipamentoById(id);
    
    // Se o usuário não for encontrado, retorna um status 404 (não encontrado)
    if (!equipamento) {
      res.status(404).send("Equipamento não encontrado");
    } else {
      // Se o usuário for encontrado, retorna os dados em formato JSON
      res.json(equipamento);
    }
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao obter o equipamento");
  }
}

// Função para criar um novo usuário
async function createEquipamento(req, res) {
  // Extrai as informações do novo usuário a partir do corpo da requisição (name, email, age)
  const {cod_eqp, patrimonio, descricao, local } = req.body;
  try {
    // Chama o método do modelo para criar o novo usuário com os dados fornecidos
    await equipamentoModel.createEquipamento(cod_eqp, patrimonio, descricao, local);
    
    // Retorna um status 201 (criado com sucesso)
    res.status(201).send("Equipamento criada com sucesso");
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao criar o equipamento");
  }
}

// Função para atualizar um usuário existente
async function updateEquipamento(req, res) {
  // Extrai o ID do usuário da URL e os novos dados do corpo da requisição
  const eqp_id = req.params.id;
  const { patrimonio, descricao, local } = req.body;
  try {
    // Chama o método do modelo para atualizar o usuário com base no ID e nos dados fornecidos
   if (!eqp_id){
    res.status(400).send({message: 'Dados incompletos'}); return;  }
    await equipamentoModel.updateEquipamento(eqp_id,patrimonio, descricao, local);
    
    // Retorna uma mensagem de sucesso após a atualização
    res.send("Equipamento atualizado com sucesso");
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao atualizar o equipamento");
  }
}

// Função para deletar um usuário
async function deleteEquipamento(req, res) {
  // Extrai o ID do usuário da URL
  const id = req.params.id;
  try {
    // Chama o método do modelo para deletar o usuário com base no ID fornecido
    await equipamentoModel.deleteEquipamento(id);
    
    // Retorna uma mensagem de sucesso após a exclusão
    res.send("Equipamento deletado com sucesso");
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao deletar o equipamento");
  }
}

// Exporta as funções do controller para serem usadas nas rotas da aplicação
module.exports = {
  getAllEquipamento,
  getEquipamento,
  createEquipamento,
  updateEquipamento,
  deleteEquipamento,
};