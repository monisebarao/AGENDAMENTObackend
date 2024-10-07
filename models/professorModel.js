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

async function getAllProfessor() {
  const query = "SELECT * FROM professor;";
  return await executeQuery(query);
}

async function getProfessorById(id) {
  const query = "SELECT * FROM professor WHERE id_prof = @id;";
  const params = [{ name: "id", type: TYPES.Int, value: id }];
  const sala = await executeQuery(query, params);
  return sala.length > 0 ? sala[0] : null;
}

async function createProfessor(id_prof ,nif_prof, nome_prof) {
  const query = `INSERT INTO professor (id_prof,nif_prof, nome_prof) VALUES ( @id_prof,@nif_prof, @nome_prof);`;
  const params = [
    {name: "id_prof", type: TYPES.Int, value: id_prof},
    { name: "nif_prof", type: TYPES.NVarChar, value: nif_prof },
    { name: "nome_prof", type: TYPES.NVarChar, value: nome_prof },
  ];
  await executeQuery(query, params);
}

async function updateProfessor(id_prof,nif_prof, nome_prof) {  // Corrigido aqui
  const query = `UPDATE professor SET nif_prof = @nif_prof, nome_prof = @nome_prof  WHERE id_prof = @id_prof;`;  // Ajustado para atualizar pelo cod_sala
   const params = [
    // Corrigido aqui
    { name: "id_prof", type: TYPES.Int, value: id_prof },
    { name: "nif_prof", type: TYPES.NVarChar, value: nif_prof },
    { name: "nome_prof", type: TYPES.NVarChar, value: nome_prof },
  ];
  await executeQuery(query, params);
}

async function deleteProfessor(id) {
  const query = "DELETE FROM professor WHERE id_prof = @id;";
  const params = [{ name: "id", type: TYPES.Int, value: id }];
  await executeQuery(query, params);
}

module.exports = {
  getAllProfessor,
  getProfessorById,
  createProfessor,
  updateProfessor,
  deleteProfessor,
};