// models/userModel.js

const { Request, TYPES } = require("tedious");
const connectDatabase = require("../database/connection");

async function executeQuery(query, params = []) {
  const connection = await connectDatabase();
  
  return new Promise((resolve, reject) => {
    const request = new Request(query, (err) => {
      if (err) {
        reject(err);
        connection.close();
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

async function getAllAgenda1() {
  const query = "SELECT * FROM agenda1;";
  return await executeQuery(query);
}

async function getAgenda1ById(id) {
  const query = "SELECT * FROM agenda1 WHERE agenda1_id = @id;";
  const params = [{ name: "id", type: TYPES.Int, value: id }];
  const sala = await executeQuery(query, params);
  return sala.length > 0 ? sala[0] : null;
}

async function createAgenda1(data_sel1, hr_entrada1, hr_saida1, turma1, disciplina1, id_prof, cod_sala) {
  const query = `INSERT INTO agenda1 (data_sel1, hr_entrada1, hr_saida1, turma1, disciplina1, id_prof, cod_sala) values ( @data_sel1, @hr_entrada1, @hr_saida1, @turma1, @disciplina1, @id_prof, @cod_sala);`;
  const params = [
    { name: "data_sel1", type: TYPES.NVarChar, value: data_sel1 },
    { name: "hr_entrada1", type: TYPES.NVarChar, value: hr_entrada1 },
    { name: "hr_saida1", type: TYPES.NVarChar, value: hr_saida1 },
    { name: "turma1", type: TYPES.NVarChar, value: turma1 },
    { name: "disciplina1", type: TYPES.NVarChar, value: disciplina1 },
    { name: "id_prof", type: TYPES.Int, value: id_prof },
    { name: "cod_sala", type: TYPES.Int, value: cod_sala },

  ];
  await executeQuery(query, params);
}

async function updateAgenda1(data_sel1, hr_entrada1, hr_saida1, turma1, disciplina1, id_prof, cod_sala) {  // Corrigido aqui
  const query = `UPDATE agenda1 SET data_sel1 = @data_sel1, hr_entrada1 = @hr_entrada1, hr_saida1 = @hr_saida, turma1 = @turma1, disciplina1 = @disciplina1, id_prof = @id_prof, cod_sala = @cod_sala  WHERE agenda1_id = @agenda1_id;`;  // Ajustado para atualizar pelo cod_sala
  const params = [
    { name: "agenda1_id", type: TYPES.Int, value: agenda1_id },  // Corrigido aqui
    { name: "data_sel1", type: TYPES.NVarChar, value: data_sel1 },
    { name: "hr_entrada1", type: TYPES.NVarChar, value: hr_entrada1 },
    { name: "hr_saida1", type: TYPES.NVarChar, value: hr_saida1 },
    { name: "turma1", type: TYPES.NVarChar, value: turma1 },
    { name: "disciplina1", type: TYPES.NVarChar, value: disciplina11 },
    { name: "id_prof", type: TYPES.Int, value: id_prof },
    { name: "cod_sala", type: TYPES.Int, value: cod_sala },
  ];
  await executeQuery(query, params);
}

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