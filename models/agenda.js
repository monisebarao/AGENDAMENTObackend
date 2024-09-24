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
  const { data_sel, horario, nif_Prof, cod_sala, PATRIMôNIO } = agenda;
  const db = openDbConnection();
  db.run(
    "INSERT INTO agenda ( data_sel, horario, nif_Prof, cod_sala, PATRIMôNIO ) VALUES (?, ?, ?, ?, ?)",
    [data_sel, horario, nif_Prof, cod_sala, PATRIMôNIO],
    function (err) {
      db.close();
      callback(err, { id: this.lastID });
    }
  );
}

function updateAgenda(agenda_id, agenda, callback) {
  const { data_sel, horario, nif_Prof, cod_sala, PATRIMôNIO } = agenda;
  const db = openDbConnection();
  db.run(
    "UPDATE agenda SET data_sel = ?, horario = ?, nif_prof = ?, cod_sala = ?, PATRIMÔNIO = ? WHERE agenda_id = ?",
    [agenda_id, data_sel, horario, nif_Prof, cod_sala, PATRIMôNIO],
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
