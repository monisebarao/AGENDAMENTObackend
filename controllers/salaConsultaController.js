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

<<<<<<< HEAD
=======

>>>>>>> 35b108fac6ee3cd72b7a4165800160b97452bad5
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
<<<<<<< HEAD
  getAgenda1BySala,
=======
 
}
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
>>>>>>> 35b108fac6ee3cd72b7a4165800160b97452bad5
};