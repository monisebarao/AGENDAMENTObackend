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

async function getAgenda1BySala(cod_sala) {
  const query = "select * from sala_consulta where cod_sala = @cod_sala"; 
  console.log ('query', query)
  // Query SQL com um parâmetro para filtrar pelo ID
  const params = [{ name: "cod_sala", type: TYPES.Int, value: cod_sala }];  // Define o parâmetro @id para ser passado na query
  const users = await executeQuery(query, params); 
  console.log ('users', users)
  // Executa a query com os parâmetros
  return users;  // Retorna o primeiro usuário se houver algum resultado, ou null se não houver

}

async function getAgenda1ByData(data_sel1) {
  const query = "select * from sala_consulta where data_sel1 >= @data_sel1"; 
  console.log ('query', query)
  // Query SQL com um parâmetro para filtrar pelo ID
  const params = [{ name: "data_sel1", type: TYPES.Int, value: data_sel1 }];  // Define o parâmetro @id para ser passado na query
  const users = await executeQuery(query, params); 
  console.log ('users', users)
  // Executa a query com os parâmetros
  return users;  // Retorna o primeiro usuário se houver algum resultado, ou null se não houver

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
  getAgenda1BySala,
  getAgenda1ByData,
};
