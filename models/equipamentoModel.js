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

async function getAllEquipamento() {
  const query = "SELECT * FROM equipamento;";
  return await executeQuery(query);
}

async function getEquipamentoById(id) {
  const query = "SELECT * FROM equipamento WHERE cod_eqp = @id;";
  const params = [{ name: "id", type: TYPES.Int, value: id }];
  const sala = await executeQuery(query, params);
  return sala.length > 0 ? sala[0] : null;
}

async function createEquipamento(cod_eqp,patrimonio, descricao, local) {
  const query = `INSERT INTO equipamento (cod_eqp,patrimonio, descricao, local) VALUES (@cod_eqp,@patrimonio, @descricao, @local);`;
  const params = [
    { name: "cod_eqp", type: TYPES.Int, value: cod_eqp },
    { name: "patrimonio", type: TYPES.NVarChar, value: patrimonio },
    { name: "descricao", type: TYPES.NVarChar, value: descricao },
    { name: "local", type: TYPES.NVarChar, value: local },
  ];
  await executeQuery(query, params);
}

async function updateEquipamento(cod_eqp,patrimonio, descricao, local) {  // Corrigido aqui
  const query = `UPDATE equipamento SET patrimonio = @patrimonio, descricao = @descricao, local = @local WHERE cod_eqp = @eqp_id;`;  // Ajustado para atualizar pelo cod_sala
   const params = [
    // Corrigido aqui
    { name: "cod_eqp", type: TYPES.Int, value: cod_eqp },
    { name: "patrimonio", type: TYPES.NVarChar, value: patrimonio },
    { name: "descricao", type: TYPES.NVarChar, value: descricao },
    { name: "local", type: TYPES.NVarChar, value: local },
  ];
  if (!cod_eqp){
    res.status(400).send({message: 'Dados incompletos'}); return;  }
  await executeQuery(query, params);
}

async function deleteEquipamento(id) {
  const query = "DELETE FROM equipamento WHERE cod_eqp = @id;";
  const params = [{ name: "id", type: TYPES.Int, value: id }];
  await executeQuery(query, params);
}

module.exports = {
  getAllEquipamento,
  getEquipamentoById,
  createEquipamento,
  updateEquipamento,
  deleteEquipamento,
};