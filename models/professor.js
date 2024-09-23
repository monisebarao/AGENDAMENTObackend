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

function getAllProfessor(callback) {
    const db = openDbConnection();
    db.all("SELECT * FROM professor", [], (err, rows) => {
      db.close();
      callback(err, rows);
    });
  }

  function createProfessor(professor, callback) {
    const { nome_prof} = professor;
    const db = openDbConnection();
    db.run(
      "INSERT INTO produtos (nome_prof) VALUES (?)",
      [nome_prof],
      function (err) {
        db.close();
        callback(err, { id: this.lastID });
      }
    );
  } 

  function updateProfessor(nif_prof, professor, callback) {
    const { nome_prof} = professor;
    const db = openDbConnection();
    db.run(
      "UPDATE professor SET nome_prof = ? WHERE nif_prof = ?",
      [nome_prof, nif_prof],
      function (err) {
        db.close();
        callback(err, { changes: this.changes });
      }
    );
  }

  function deleteProfessor(callback) {
    const db = openDbConnection();
    db.run("DELETE FROM professor", function (err) {
      db.close();
      callback(err, { changes: this.changes });
    });
  }

  module.exports = {
    getAllProfessor,
    createProfessor,
    updateProfessor,
    deleteProfessor
  }