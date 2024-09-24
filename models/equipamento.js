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

  function updateEquipamento(patrimonio, equipamento, callback) {
    const {descricao, local } = equipamento;
    const db = openDbConnection();
    db.run(
      "UPDATE equipamento SET patriomonio= ?, descricao = ?, local = ? WHERE patrimonio = ?",
      [descricao, local, patrimonio],
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