const agenda1Model = require("../models/agenda1Model");

// Função para obter todos os agendamentos
async function getAllAgenda1(req, res) {
  try {
    const agenda1 = await agenda1Model.getAllAgenda1();
    res.json(agenda1);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro ao obter as agendas");
  }
}

// Função para obter um agendamento pelo ID
async function getAgenda1(req, res) {
  const id = parseInt(req.params.id);
  try {
    const agenda1 = await agenda1Model.getAgenda1ById(id);
    if (!agenda1) {
      res.status(404).send("Agenda não encontrada");
    } else {
      res.json(agenda1);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro ao obter a agenda");
  }
}

// Função para criar um agendamento
async function createAgenda1(req, res) {
  const { data_sel1, hr_entrada1, hr_saida1, turma1, disciplina1, id_prof, cod_sala } = req.body;

  console.log("Dados recebidos no controlador:", {
    data_sel1,
    hr_entrada1,
    hr_saida1,
    turma1,
    disciplina1,
    id_prof,
    cod_sala,
  });
}

// Verificação básica para garantir que todos os dados necessários estão presentes
if (!data_sel1 || !hr_entrada1 || !hr_saida1 || !turma1 || !disciplina1 || !id_prof || !cod_sala) {
  return res.status(400).send("Todos os campos são obrigatórios.");
}

try {
  await agenda1Model.createAgenda1(data_sel1, hr_entrada1, hr_saida1, turma1, disciplina1, id_prof, cod_sala);

  // Extrai as informações do novo usuário a partir do corpo da requisição (name, email, age)
  const { data_sel1, hr_entrada1, hr_saida1, turma1, disciplina1, id_prof, cod_sala } = req.body;
  try {
    // Chama o método do modelo para criar o novo usuário com os dados fornecidos
    await agenda1Model.createAgenda1(data_sel1, hr_entrada1, hr_saida1, turma1, disciplina1, id_prof, cod_sala);

    // Retorna um status 201 (criado com sucesso)

    res.status(201).send("Agenda criada com sucesso");
  } catch (err) {
    console.error("Erro ao criar a agenda:", err.message);
    res.status(500).send("Erro ao criar a agenda");
  }
}

// Função para atualizar um agendamento
async function updateAgenda1(req, res) {

  const agenda1_id = parseInt(req.params.id);
  const { data_sel1, hr_entrada1, hr_saida1, turma1, disciplina1, id_prof, cod_sala } = req.body;

  if (!data_sel1 || !hr_entrada1 || !hr_saida1 || !turma1 || !disciplina1 || !id_prof || !cod_sala) {
    return res.status(400).send("Todos os campos são obrigatórios.");
  }

  try {
    await agenda1Model.updateAgenda1(agenda1_id, data_sel1, hr_entrada1, hr_saida1, turma1, disciplina1, id_prof, cod_sala);

    // Extrai o ID do usuário da URL e os novos dados do corpo da requisição
    const agenda1_id = req.params.id;
    const { data_sel1, horario1, id_prof, cod_sala } = req.body;
    try {
      // Chama o método do modelo para atualizar o usuário com base no ID e nos dados fornecidos
      await agenda1Model.updateAgenda1(agenda1_id, data_sel1, horario1, id_prof, cod_sala);

      // Retorna uma mensagem de sucesso após a atualização

      res.send("Agenda atualizada com sucesso");
    } catch (err) {
      console.error("Erro ao atualizar a agenda:", err.message);
      res.status(500).send("Erro ao atualizar a agenda");
    }
  }

// Função para deletar um agendamento pelo ID
async function deleteAgenda1(req, res) {
    const id = parseInt(req.params.id);
    try {
      await agenda1Model.deleteAgenda1(id);
      res.send("Agenda deletada com sucesso");
    } catch (err) {
      console.error("Erro ao deletar a agenda:", err.message);
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

};

