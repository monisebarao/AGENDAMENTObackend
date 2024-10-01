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

function getAllEquipamento(callback) {
    const db = openDbConnection();
    db.all("SELECT * FROM equipamento", [], (err, rows) => {
      db.close();
      callback(err, rows);
    });
  }

  function createEquipamento(patrimonio, equipamento, callback) {
    const { descricao, local} = equipamento;
    const db = openDbConnection();
    db.run(
      "INSERT INTO equipamento (patrimonio, descricao, local) VALUES (?, ?, ?)",
      [patrimonio, descricao, local],
      function (err) {
        db.close();
        callback(err, { id: this.lastID });
      }
    );
  }

  function updateEquipamento(cod_eqp, equipamento, callback) {
    const {patrimonio, descricao, local } = equipamento;
    const db = openDbConnection();
    db.run(
      "UPDATE equipamento SET patriomonio= ?, descricao = ?, local = ? WHERE cod_eqp = ?",
      [descricao, local, patrimonio, cod_eqp],
      function (err) {
        db.close();
        callback(err, { changes: this.changes });
      }
    );
  }

  function deleteEquipamento(callback) {
    const db = openDbConnection();
    db.run("DELETE FROM equipamento", function (err) {
      db.close();
      callback(err, { changes: this.changes });
    });
  }

  module.exports = {
    getAllEquipamento,
    createEquipamento,
    updateEquipamento,
    deleteEquipamento
  }