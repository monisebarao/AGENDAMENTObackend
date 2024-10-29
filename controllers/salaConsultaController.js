// controllers/agendamentoController.js

// Importa o modelo de usuário que contém a lógica de interação com o banco de dados
const salaConsultaModel = require("../models/salaConsultaModel");

// Função para obter todos os usuários
async function getAllSalaConsulta(req, res) {
  try {
    // Chama o método do modelo para obter todos os usuários do banco de dados
    const salaConsulta = await salaConsultaModel.getAllSalaConsulta();
    
    // Retorna a lista de usuários em formato JSON
    res.json(salaConsulta);
  } catch (err) {
    // Exibe o erro no console, se houver, e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao obter os agendamentos de sala");
  }
}

// Exporta as funções do controller para serem usadas nas rotas da aplicação
module.exports = {
  getAllSalaConsulta,
 
};