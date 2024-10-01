const { Request, TYPES } = require("tedious");

// Importa a função que conecta ao banco de dados
const connectDatabase = require("../database/connection");

// Função genérica para executar uma query SQL
async function executeQuery(query, params = []) {
  // Estabelece uma conexão com o banco de dados
  const connection = await connectDatabase();
  
  // Retorna uma Promise para lidar com a execução assíncrona da query
  return new Promise((resolve, reject) => {
    // Cria uma nova requisição SQL com a query passada e um callback para erros
    const request = new Request(query, (err) => {
      if (err) {
        // Se ocorrer um erro, a Promise é rejeitada e a conexão é fechada
        reject(err);
        connection.close();
      }
    });

    // Adiciona parâmetros à requisição SQL (nome, tipo e valor)
    params.forEach(({ name, type, value }) => {
      request.addParameter(name, type, value);
    });

    // Array para armazenar os resultados retornados pela query
    let results = [];

    // Evento "row" é disparado para cada linha retornada pela query
    request.on("row", (columns) => {
      // Cria um objeto para cada linha e armazena suas colunas e valores
      let row = {};
      columns.forEach((column) => {
        row[column.metadata.colName] = column.value;
      });
      results.push(row);
    });

    // Evento "requestCompleted" é disparado quando a query é completamente executada
    request.on("requestCompleted", () => {
      // Fecha a conexão com o banco de dados e resolve a Promise com os resultados
      connection.close();
      resolve(results);
    });

    // Executa a requisição SQL
    connection.execSql(request);
  });
}

function getAllSala(callback) {
    const db = openDbConnection();
    db.all("SELECT * FROM sala", [], (err, rows) => {
      db.close();
      callback(err, rows);
    });
  }

  function createSala(sala, callback) {
    const { nome_sala} = sala;
    const db = openDbConnection();
    db.run(
      "INSERT INTO sala (nome_sala) VALUES (?)",
      [nome_sala],
      function (err) {
        db.close();
        callback(err, { id: this.lastID });
      }
    );
  }

  function updateSala(cod_sala, sala, callback) {
    const { nome_sala} = sala;
    const db = openDbConnection();
    db.run(
      "UPDATE sala SET nome_sala = ? WHERE cod_sala = ?",
      [nome_sala, cod_sala],
      function (err) {
        db.close();
        callback(err, { changes: this.changes });
      }
    );
  }

  function deleteSala(callback) {
    const db = openDbConnection();
    db.run("DELETE FROM sala", function (err) {
      db.close();
      callback(err, { changes: this.changes });
    });
  }

  module.exports = {
    getAllSala,
    updateSala,
    createSala,
    deleteSala,
  }