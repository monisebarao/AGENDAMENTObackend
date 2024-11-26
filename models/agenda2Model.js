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

async function getAllAgenda2() {
  const query = "SELECT * FROM agenda2;";
  return await executeQuery(query);
}

async function getAgenda2ById(id) {
  const query = "SELECT * FROM agenda2 WHERE agenda2_id = @id;";
  const params = [{ name: "id", type: TYPES.Int, value: id }];
  const sala = await executeQuery(query, params);
  return sala.length > 0 ? sala[0] : null;
}

async function createAgenda2(data_sel2, hr_entrada2, hr_saida2, turma2, disciplina2, id_prof, cod_eqp, qnt_eqp) {
  const query = `INSERT INTO agenda2 (data_sel2, hr_entrada2, hr_saida2, turma2, disciplina2, id_prof, cod_eqp, qnt_eqp) VALUES (@data_sel2, @hr_entrada2, @hr_saida2, @turma2, @disciplina2, @id_prof, @cod_eqp, @qnt_eqp);`;

  console.log("Parâmetros recebidos para inserção:", {
    data_sel2,
    hr_entrada2,
    hr_saida2,
    turma2,
    disciplina2,
    id_prof,
    cod_eqp,
    qnt_eqp
  });
  
    const params = [
      { name: "data_sel2", type: TYPES.NVarChar, value: data_sel2 },
      { name: "hr_entrada2", type: TYPES.NVarChar, value: hr_entrada2 },
      { name: "hr_saida2", type: TYPES.NVarChar, value: hr_saida2 },
      { name: "turma2", type: TYPES.NVarChar, value: turma2 },
      { name: "disciplina2", type: TYPES.NVarChar, value: disciplina2 },
      { name: "id_prof", type: TYPES.Int, value: id_prof },
      { name: "cod_eqp", type: TYPES.Int, value: cod_eqp },
      { name: "qnt_eqp", type: TYPES.Int, value: qnt_eqp },
    ];

    await executeQuery(query, params);
  }

async function updateAgenda2(agenda2_id, data_sel2,horario2,id_prof,cod_eqp) {  // Corrigido aqui
  const query = `UPDATE agenda2 SET data_sel2 = @data_sel2, horario2 = @horario2, id_prof = @id_prof, cod_eqp = @cod_eqp  WHERE agenda2_id = @agenda2_id;`;  // Ajustado para atualizar pelo cod_sala
   const params = [
    // Corrigido aqui
    { name:"agenda2_id", type: TYPES.Int, value: agenda2_id},
    { name: "data_sel2", type: TYPES.NVarChar, value: data_sel2 },
    { name: "horario2", type: TYPES.NVarChar, value: horario2 },
    { name: "id_prof", type: TYPES.Int, value: id_prof },
    { name: "cod_eqp", type: TYPES.Int, value: cod_eqp },
  ];
  if (!data_sel2){
    res.status(400).send({message: 'Dados incompletos'}); return;  }
  await executeQuery(query, params);
}

async function deleteAgenda2(id) {
  const query = "DELETE FROM agenda2 WHERE agenda2_id = @id;";
  const params = [{ name: "id", type: TYPES.Int, value: id }];
  await executeQuery(query, params);
}

module.exports = {
  getAllAgenda2,
  getAgenda2ById,
  createAgenda2,
  updateAgenda2,
  deleteAgenda2,
};