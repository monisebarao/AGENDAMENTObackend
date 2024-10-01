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

// Função para buscar todos os clientes
function getAllAgenda(callback) {
  const db = openDbConnection();
  db.all("SELECT * FROM agenda", [], (err, rows) => {
    db.close();
    callback(err, rows);
  });
}

// Função para criar um novo cliente
function createAgenda(agenda, callback) {
  const { data_sel1, horario1, id_Prof, cod_sala } = agenda;
  const db = openDbConnection();
  db.run(
    "INSERT INTO agenda ( data_sel, horario, id_Prof, cod_sala ) VALUES (?, ?, ?, ?)",
    [data_sel1, horario1, id_Prof, cod_sala],
    function (err) {
      db.close();
      callback(err, { id: this.lastID });
    }
  );
}

function updateAgenda( agenda_id, agenda, callback) {
  const { data_sel1, horario1, nif_Prof, cod_sala} = agenda;
  const db = openDbConnection();
  db.run(
    "UPDATE agenda SET data_sel = ?, horario = ?, nif_prof = ?, cod_sala = ?, patrimonio = ? WHERE agenda_id = ?",
    [ agenda_id, data_sel1, horario1, nif_Prof, cod_sala],
    function (err) {
      db.close();
      callback(err, { changes: this.changes });
    }
  );
}

// Função para deletar um cliente
function deleteAgenda(callback) {
  const db = openDbConnection();
  db.run("DELETE FROM agenda", function (err) {
    db.close();
    callback(err, { changes: this.changes });
  });
}

module.exports = {
  getAllAgenda,
  createAgenda,
  updateAgenda,
  deleteAgenda
};
