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

async function getAgenda2ByEqp(req, res) {
  // Extrai o ID do usuário da requisição (usado na URL: /users/:id)
  const cod_eqp = req.params.cod_eqp;
  try {
    // Chama o método do modelo para obter o usuário com base no ID fornecido
    const user = await equipamentoConsultaModel.getAgenda2ByEqp(cod_eqp);
    
    // Se o usuário não for encontrado, retorna um status 404 (não encontrado)
    if (!user) {
      res.status(404).send("Usuário não encontrado");
    } else {
      // Se o usuário for encontrado, retorna os dados em formato JSON
      res.json(user);
    }
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao obter o usuário");
  }
}

// Exporta as funções do controller para serem usadas nas rotas da aplicação
module.exports = {
  getAllEquipamentoConsulta,
  getAgenda2ByEqp
 
};