// controllers/agendamentoController.js

// Importa o modelo de usuário que contém a lógica de interação com o banco de dados
const equipamentoConsultaModel = require("../models/equipamentoConsultaModel");

// Função para obter todos os usuários
async function getAllEquipamentoConsulta(req, res) {
  try {
    // Chama o método do modelo para obter todos os usuários do banco de dados
    const equipamentoConsulta = await equipamentoConsultaModel.getAllEquipamentoConsulta();
    
    // Retorna a lista de usuários em formato JSON
    res.json(equipamentoConsulta);
  } catch (err) {
    // Exibe o erro no console, se houver, e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao obter os agendamentos de sala");
  }
}

// Exporta as funções do controller para serem usadas nas rotas da aplicação
module.exports = {
  getAllEquipamentoConsulta,
 
};