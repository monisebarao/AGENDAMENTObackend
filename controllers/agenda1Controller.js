// controllers/agendamentoController.js

// Importa o modelo de usuário que contém a lógica de interação com o banco de dados
const agenda1Model = require("../models/agenda1Model");

// Função para obter todos os usuários
async function getAllAgenda1(req, res) {
  try {
    // Chama o método do modelo para obter todos os usuários do banco de dados
    const agenda1 = await agenda1Model.getAllAgenda1();
    
    // Retorna a lista de usuários em formato JSON
    res.json(agenda1);
  } catch (err) {
    // Exibe o erro no console, se houver, e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao obter as agendas");
  }
}

// Função para obter um usuário específico pelo ID
async function getAgenda1(req, res) {
  // Extrai o ID do usuário da requisição (usado na URL: /users/:id)
  const id = req.params.id;
  try {
    // Chama o método do modelo para obter o usuário com base no ID fornecido
    const agenda1 = await agenda1Model.getAgenda1ById(id);
    
    // Se o usuário não for encontrado, retorna um status 404 (não encontrado)
    if (!agenda1) {
      res.status(404).send("Agenda não encontrada");
    } else {
      // Se o usuário for encontrado, retorna os dados em formato JSON
      res.json(agenda1);
    }
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao obter a agenda");
  }
}

// Função para criar um novo usuário
async function createAgenda1(req, res) {
  // Extrai as informações do novo usuário a partir do corpo da requisição (name, email, age)
  const {data_sel1, hr_entrada1, hr_saida1, turma1, disciplina1, id_prof, cod_sala} = req.body;
  try {
    // Chama o método do modelo para criar o novo usuário com os dados fornecidos
    await agenda1Model.createAgenda1(data_sel1, hr_entrada1, hr_saida1, turma1, disciplina1, id_prof, cod_sala);
    
    // Retorna um status 201 (criado com sucesso)
    res.status(201).send("Agenda criada com sucesso");
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao criar a agenda");
  }
}

// Função para atualizar um usuário existente
async function updateAgenda1(req, res) {
  // Extrai o ID do usuário da URL e os novos dados do corpo da requisição
  const agenda1_id = req.params.id;
  const { data_sel1, horario1, id_prof, cod_sala } = req.body;
  try {
    // Chama o método do modelo para atualizar o usuário com base no ID e nos dados fornecidos
    await agenda1Model.updateAgenda1(agenda1_id ,data_sel1, horario1, id_prof, cod_sala );
    
    // Retorna uma mensagem de sucesso após a atualização
    res.send("Agenda atualizada com sucesso");
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao atualizar a agenda");
  }
}

// Função para deletar um usuário
async function deleteAgenda1(req, res) {
  // Extrai o ID do usuário da URL
  const id = req.params.id;
  try {
    // Chama o método do modelo para deletar o usuário com base no ID fornecido
    await agenda1Model.deleteAgenda1(id);
    
    // Retorna uma mensagem de sucesso após a exclusão
    res.send("Agenda deletada com sucesso");
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao deletar a agenda");
  }
}

// Exporta as funções do controller para serem usadas nas rotas da aplicação
module.exports = {
  getAllAgenda1,
  getAgenda1,
  createAgenda1,
  updateAgenda1,
  deleteAgenda1,
};