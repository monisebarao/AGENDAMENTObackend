// controllers/agendamentoController.js

// Importa o modelo de usuário que contém a lógica de interação com o banco de dados
const salaConsultaModel = require("../models/salaConsultaModel");

// Função para obter todos os usuários
async function getAllSalaConsulta(req, res) {
  console.log('Response object:', res); // Log the response object to inspect it
  try {
      const salaConsulta = await salaConsultaModel.getAllSalaConsulta();
      res.json(salaConsulta);
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Erro ao obter os agendamentos de sala");
  }
}

async function getAgenda1BySala(req, res) {
  // Extrai o ID do usuário da requisição (usado na URL: /users/:id)
  const cod_sala = req.params.cod_sala;
  try {
    // Chama o método do modelo para obter o usuário com base no ID fornecido
    const user = await salaConsultaModel.getAgenda1BySala(cod_sala);
    
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

async function createSalaConsulta (req, res) {
  // Extrai as informações do novo usuário a partir do corpo da requisição (name, email, age)
  const { nome_sala, nome_prof, dtinicio, hr_entrada1, hr_saida1, turma } = req.body;
  try {
    // Chama o método do modelo para criar o novo usuário com os dados fornecidos
    await salaConsultaModel.createSalaConsulta(nome_sala, nome_prof, dtinicio, hr_entrada1, hr_saida1, turma);
    
    // Retorna um status 201 (criado com sucesso)
    res.status(201).send("Agendamento criada com sucesso");
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao criar a agendamento");
  }
}


// Exporta as funções do controller para serem usadas nas rotas da aplicação
module.exports = {
  getAllSalaConsulta,
  createSalaConsulta,
  getAgenda1BySala,
};