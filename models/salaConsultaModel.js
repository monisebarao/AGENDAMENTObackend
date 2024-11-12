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

async function getAllSalaConsulta() {
  const query = "SELECT * FROM sala_consulta ;";
  return await executeQuery(query);
}

async function createSalaConsulta(nome_sala, nome_prof, dtinicio, hr_entrada1, hr_saida1, turma) {
  const query = `INSERT INTO agenda1 (nome_sala, nome_prof, dtinicio, hr_entrada1, hr_saida1) VALUES ( @nome_sala, @nome_prof, @dtinicio, @hr_entrada1, @hr_saida1);`;
  const params = [
    { name: "dtinicio", type: TYPES.NVarChar, value: dtinicio },
    { name: "hr_entrada1", type: TYPES.NVarChar, value: hr_entrada1},
    { name: "hr_saida1", type: TYPES.NVarChar, value: hr_saida1},
    { name: "nome_prof", type: TYPES.NVarChar, value: nome_prof },
    { name: "nome_sala", type: TYPES.NVarChar, value: nome_sala },
    { name: "turma", type: TYPES.NVarChar, value: turma },
  ];
  await executeQuery(query, params);
}

module.exports = {
  createSalaConsulta,
  getAllSalaConsulta,
};
