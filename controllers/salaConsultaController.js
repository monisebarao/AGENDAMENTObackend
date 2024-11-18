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

<<<<<<< HEAD
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
 
=======
async function getConsultaLMT(req, res) {
  const id = req.params.id;
  try {
    // Chama o método do modelo para obter o usuário com base no ID fornecido
    const salaConsulta = await salaConsultaModel.getConsultaLMT(id);
    
    // Se o usuário não for encontrado, retorna um status 404 (não encontrado)
    if (!salaConsulta) {
      res.status(404).send("Agendamento não encontrado");
    } else {
      // Se o usuário for encontrado, retorna os dados em formato JSON
      res.json(sala);
    }
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao obter a agendamento");
  }
}

async function getConsultaMaker(req, res) {
  const id = req.params.id;
  try {
    // Chama o método do modelo para obter o usuário com base no ID fornecido
    const salaConsulta = await salaConsultaModel.getConsultaMaker(id);
    
    // Se o usuário não for encontrado, retorna um status 404 (não encontrado)
    if (!salaConsulta) {
      res.status(404).send("Agendamento não encontrado");
    } else {
      // Se o usuário for encontrado, retorna os dados em formato JSON
      res.json(sala);
    }
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao obter a agendamento");
  }
}

async function getConsultaBiblioteca(req, res) {
  const id = req.params.id;
  try {
    // Chama o método do modelo para obter o usuário com base no ID fornecido
    const salaConsulta = await salaConsultaModel.getConsultaBiblioteca(id);
    
    // Se o usuário não for encontrado, retorna um status 404 (não encontrado)
    if (!salaConsulta) {
      res.status(404).send("Agendamento não encontrado");
    } else {
      // Se o usuário for encontrado, retorna os dados em formato JSON
      res.json(sala);
    }
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao obter a agendamento");
  }
}

async function getConsultaBioquimica(req, res) {
  const id = req.params.id;
  try {
    // Chama o método do modelo para obter o usuário com base no ID fornecido
    const salaConsulta = await salaConsultaModel.getConsultaBioquimica(id);
    
    // Se o usuário não for encontrado, retorna um status 404 (não encontrado)
    if (!salaConsulta) {
      res.status(404).send("Agendamento não encontrado");
    } else {
      // Se o usuário for encontrado, retorna os dados em formato JSON
      res.json(sala);
    }
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao obter a agendamento");
  }
}

async function getConsultaFisica(req, res) {
  const id = req.params.id;
  try {
    // Chama o método do modelo para obter o usuário com base no ID fornecido
    const salaConsulta = await salaConsultaModel.getConsultaFisica(id);
    
    // Se o usuário não for encontrado, retorna um status 404 (não encontrado)
    if (!salaConsulta) {
      res.status(404).send("Agendamento não encontrado");
    } else {
      // Se o usuário for encontrado, retorna os dados em formato JSON
      res.json(sala);
    }
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao obter a agendamento");
  }
}

async function getConsultaSenai(req, res) {
  const id = req.params.id;
  try {
    // Chama o método do modelo para obter o usuário com base no ID fornecido
    const salaConsulta = await salaConsultaModel.getConsultaSenai(id);
    
    // Se o usuário não for encontrado, retorna um status 404 (não encontrado)
    if (!salaConsulta) {
      res.status(404).send("Agendamento não encontrado");
    } else {
      // Se o usuário for encontrado, retorna os dados em formato JSON
      res.json(sala);
    }
  } catch (err) {
    // Exibe o erro no console e retorna uma resposta com status 500
    console.error(err.message);
    res.status(500).send("Erro ao obter a agendamento");
  }
}

module.exports = {
  getAllSalaConsulta,
  getConsultaLMT,
  getConsultaMaker,
  getConsultaBiblioteca,
  getConsultaBioquimica,
  getConsultaFisica,
  getConsultaSenai,
>>>>>>> b4302de1ecc1231b4674ee801d3c277277527896
};