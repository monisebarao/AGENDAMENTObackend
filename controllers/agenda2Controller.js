// controllers/agendamentoController.js

// Importa o modelo de usuário que contém a lógica de interação com o banco de dados
const agenda2Model = require("../models/agenda2Model");

// Função para obter todos os usuários
async function getAllAgenda2(req, res) {
  try {
    // Chama o método do modelo para obter todos os usuários do banco de dados
    const agenda2 = await agenda2Model.getAllAgenda2();
    
    // Retorna a lista de usuários em formato JSON
    res.json(agenda2);
  } catch (err) {
    // Exibe o erro no console, se houver, e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao obter as agendas");
  }
}

// Função para obter um usuário específico pelo ID
async function getAgenda2(req, res) {
  // Extrai o ID do usuário da requisição (usado na URL: /users/:id)
  const id = req.params.id;
  try {
    // Chama o método do modelo para obter o usuário com base no ID fornecido
    const agenda2 = await agenda2Model.getAgenda2ById(id);
    
    // Se o usuário não for encontrado, retorna um status 404 (não encontrado)
    if (!agenda2) {
      res.status(404).send("Agenda não encontrada");
    } else {
      // Se o usuário for encontrado, retorna os dados em formato JSON
      res.json(agenda2);
    }
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao obter a agenda");
  }
}

// Função para criar um novo usuário
async function createAgenda2(req, res) {
  // Extrai as informações do novo usuário a partir do corpo da requisição (name, email, age)
  const {data_sel2, hr_entrada2, hr_saida2, id_prof, cod_eqp } = req.body;
  try {
    // Chama o método do modelo para criar o novo usuário com os dados fornecidos
    await agenda2Model.createAgenda2(data_sel2, hr_entrada2, hr_saida2, id_prof, cod_eqp);
    
    // Retorna um status 201 (criado com sucesso)
    res.status(201).send("Agenda criada com sucesso");
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao criar a agenda");
  }
}

// Função para atualizar um usuário existente
async function updateAgenda2(req, res) {
  // Extrai o ID do usuário da URL e os novos dados do corpo da requisição
  const agenda2_id = req.params.id;
  const { data_sel2, hr_entrada2, hr_saida2,id_prof, cod_eqp } = req.body;
  try {
    // Chama o método do modelo para atualizar o usuário com base no ID e nos dados fornecidos
   if (!agenda2_id){
    res.status(400).send({message: 'Dados incompletos'}); return;  }
    await agenda2Model.updateAgenda2(agenda2_id, data_sel2, hr_entrada2, hr_saida2, id_prof, cod_eqp);
    
    // Retorna uma mensagem de sucesso após a atualização
    res.send("Agenda atualizada com sucesso");
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao atualizar a agenda");
  }
}

// Função para deletar um usuário
async function deleteAgenda2(req, res) {
  // Extrai o ID do usuário da URL
  const id = req.params.id;
  try {
    // Chama o método do modelo para deletar o usuário com base no ID fornecido
    await agenda2Model.deleteAgenda2(id);
    
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
  getAllAgenda2,
  getAgenda2,
  createAgenda2,
  updateAgenda2,
  deleteAgenda2,
};