const sqlite3 = require("sqlite3").verbose();
const dbPath = './infra/database.db';
// Função para abrir conexão com o banco de dados

function openDbConnection() {
  let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error("Erro ao abrir o banco de dados:", err.message);
    }
  });
  return db;
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