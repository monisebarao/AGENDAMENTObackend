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

async function getAllEquipamentoConsulta() {
  const query = "SELECT * FROM equipamento_consulta ;";
  return await executeQuery(query);
}

async function getAgenda2ByEqp(cod_eqp) {
  const query = "select * from equipamento_consulta where cod_eqp = @cod_eqp"; 
  console.log ('query', query)
  // Query SQL com um parâmetro para filtrar pelo ID
  const params = [{ name: "cod_eqp", type: TYPES.Int, value: cod_eqp }];  // Define o parâmetro @id para ser passado na query
  const users = await executeQuery(query, params); 
  console.log ('users', users)
  // Executa a query com os parâmetros
  return users;  // Retorna o primeiro usuário se houver algum resultado, ou null se não houver

}

module.exports = {
  getAllEquipamentoConsulta,
getAgenda2ByEqp,
};
