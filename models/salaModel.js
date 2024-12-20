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

async function getAllSala() {
  const query = "SELECT * FROM sala;";
  return await executeQuery(query);
}

async function getSalaById(id) {
  const query = "SELECT * FROM sala WHERE cod_sala = @id;";
  const params = [{ name: "id", type: TYPES.Int, value: id }];
  const sala = await executeQuery(query, params);
  return sala.length > 0 ? sala[0] : null;
}

async function createSala(cod_sala, nome_sala) {
  const query = `INSERT INTO sala (cod_sala, nome_sala) VALUES (@cod_sala, @nome_sala);`;
  const params = [
    { name: "cod_sala", type: TYPES.Int, value: cod_sala },  // Corrigido aqui
    { name: "nome_sala", type: TYPES.NVarChar, value: nome_sala },
  ];
  await executeQuery(query, params);
}

async function updateSala(cod_sala, nome_sala) {  // Corrigido aqui
  const query = `UPDATE sala SET nome_sala = @nome_sala WHERE cod_sala = @cod_sala;`;  // Ajustado para atualizar pelo cod_sala
  const params = [
    { name: "cod_sala", type: TYPES.Int, value: cod_sala },  // Corrigido aqui
    { name: "nome_sala", type: TYPES.NVarChar, value: nome_sala },
  ];
  await executeQuery(query, params);
}

async function deleteSala(id) {
  const query = "DELETE FROM sala WHERE cod_sala = @id;";
  const params = [{ name: "id", type: TYPES.Int, value: id }];
  await executeQuery(query, params);
}

module.exports = {
  getAllSala,
  getSalaById,
  createSala,
  updateSala,
  deleteSala,
};
