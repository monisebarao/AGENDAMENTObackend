const { Request, TYPES } = require("tedious");
const connectDatabase = require("../database/connection");

async function executeQuery(query, params = []) {
  const connection = await connectDatabase();

  return new Promise((resolve, reject) => {
    const request = new Request(query, (err) => {
      if (err) {
        connection.close();
        reject(err);
      }
    });

    params.forEach(({ name, type, value }) => {
      request.addParameter(name, type, value);
    });

    let results = [];
    request.on("row", (columns) => {
      let row = {};
      columns.forEach((column) => {
        row[column.metadata.colName] = column.value;
      });
      results.push(row);
    });

    request.on("requestCompleted", () => {
      connection.close();
      resolve(results);
    });

    connection.execSql(request);
  });
}

// Função para obter todos os agendamentos
async function getAllAgenda1() {
  const query = "SELECT * FROM agenda1;";
  return await executeQuery(query);
}

// Função para obter um agendamento pelo ID
async function getAgenda1ById(id) {
  const query = "SELECT * FROM agenda1 WHERE agenda1_id = @id;";
  const params = [{ name: "id", type: TYPES.Int, value: id }];
  const result = await executeQuery(query, params);
  return result.length > 0 ? result[0] : null;
}

// Função para criar um agendamento
async function createAgenda1(data_sel1, hr_entrada1, hr_saida1, turma1, disciplina1, id_prof, cod_sala) {
  const query = `INSERT INTO agenda1 (data_sel1, hr_entrada1, hr_saida1, turma1, disciplina1, id_prof, cod_sala) VALUES (@data_sel1, @hr_entrada1, @hr_saida1, @turma1, @disciplina1, @id_prof, @cod_sala);`;

  console.log("Parâmetros recebidos para inserção:", {
    data_sel1,
    hr_entrada1,
    hr_saida1,
    turma1,
    disciplina1,
    id_prof,
    cod_sala,
  });

  const params = [
    { name: "data_sel1", type: TYPES.Date, value: data_sel1 },
    { name: "hr_entrada1", type: TYPES.VarChar, value: hr_entrada1 },
    { name: "hr_saida1", type: TYPES.VarChar, value: hr_saida1 },
    { name: "turma1", type: TYPES.NVarChar, value: turma1 },
    { name: "disciplina1", type: TYPES.NVarChar, value: disciplina1 },
    { name: "id_prof", type: TYPES.Int, value: id_prof },
    { name: "cod_sala", type: TYPES.Int, value: cod_sala },
  ];

  await executeQuery(query, params);
}

// Função para atualizar um agendamento
async function updateAgenda1(agenda1_id, data_sel1, hr_entrada1, hr_saida1, turma1, disciplina1, id_prof, cod_sala) {
  const query = `UPDATE agenda1 SET data_sel1 = @data_sel1, hr_entrada1 = @hr_entrada1, hr_saida1 = @hr_saida1, turma1 = @turma1, disciplina1 = @disciplina1, id_prof = @id_prof, cod_sala = @cod_sala WHERE agenda1_id = @agenda1_id;`;

  const params = [
    { name: "agenda1_id", type: TYPES.Int, value: agenda1_id },
    { name: "data_sel1", type: TYPES.Date, value: data_sel1 },
    { name: "hr_entrada1", type: TYPES.VarChar, value: hr_entrada1 },
    { name: "hr_saida1", type: TYPES.VarChar, value: hr_saida1 },
    { name: "turma1", type: TYPES.NVarChar, value: turma1 },
    { name: "disciplina1", type: TYPES.NVarChar, value: disciplina1 },
    { name: "id_prof", type: TYPES.Int, value: id_prof },
    { name: "cod_sala", type: TYPES.Int, value: cod_sala },
  ];

  await executeQuery(query, params);
}

// Função para deletar um agendamento pelo ID
async function deleteAgenda1(id) {
  const query = "DELETE FROM agenda1 WHERE agenda1_id = @id;";
  const params = [{ name: "id", type: TYPES.Int, value: id }];
  await executeQuery(query, params);
}

module.exports = {
  getAllAgenda1,
  getAgenda1ById,
  createAgenda1,
  updateAgenda1,
  deleteAgenda1,
};
