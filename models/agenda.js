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

function getAllSala(callback) {
  const db = openDbConnection();
  db.all("SELECT * FROM sala", [], (err, rows) => {
    db.close();
    callback(err, rows);
  });
}

function getAllEquipamento(callback) {
  const db = openDbConnection();
  db.all("SELECT * FROM equipamento", [], (err, rows) => {
    db.close();
    callback(err, rows);
  });
}

function getAllProfessor(callback) {
  const db = openDbConnection();
  db.all("SELECT * FROM professor", [], (err, rows) => {
    db.close();
    callback(err, rows);
  });
}

// Função para criar um novo cliente
function createAgenda(agenda, callback) {
  const { data_sel, horario } = agenda;
  const db = openDbConnection();
  db.run(
    "INSERT INTO produtos (data_sel, horario) VALUES (?, ?)",
    [data_sel, horario],
    function (err) {
      db.close();
      callback(err, { id: this.lastID });
    }
  );
}

// Função para criar um novo cliente
function createSala(sala, callback) {
  const { nome_sala} = sala;
  const db = openDbConnection();
  db.run(
    "INSERT INTO produtos (nome_sala) VALUES (?)",
    [nome_sala],
    function (err) {
      db.close();
      callback(err, { id: this.lastID });
    }
  );
}

// Função para criar um novo cliente
function createEquipamento(equipamento, callback) {
  const { PATRIMÔNIO, DESCRIÇÃO, LOCAL} = equipamento;
  const db = openDbConnection();
  db.run(
    "INSERT INTO produtos (PATRIMÔNIO, DESCRIÇÃO, LOCAL) VALUES (?, ?, ?)",
    [PATRIMÔNIO, DESCRIÇÃO, LOCAL],
    function (err) {
      db.close();
      callback(err, { id: this.lastID });
    }
  );
}

function createProfessor(professor, callback) {
  const { nome_prof} = professor;
  const db = openDbConnection();
  db.run(
    "INSERT INTO produtos (nome_prof) VALUES (?)",
    [PATRIMÔNIO, DESCRIÇÃO, LOCAL],
    function (err) {
      db.close();
      callback(err, { id: this.lastID });
    }
  );
}

function updateAgenda(agenda_id, agenda, callback) {
  const { data_sel, horario} = agenda;
  const db = openDbConnection();
  db.run(
    "UPDATE agenda SET data_sel = ?, horario = ? WHERE agenda_id = ?",
    [data_sel, horario, agenda_id],
    function (err) {
      db.close();
      callback(err, { changes: this.changes });
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

function updateEquipamento(PATRIMÔNIO, equipamento, callback) {
  const {DESCRIÇÃO, LOCAL } = equipamento;
  const db = openDbConnection();
  db.run(
    "UPDATE equipamento SET DESCRIÇÃO = ?, LOCAL = ? WHERE PATRIMÔNIO = ?",
    [DESCRIÇÃO, LOCAL, PATRIMÔNIO],
    function (err) {
      db.close();
      callback(err, { changes: this.changes });
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

// Função para deletar um cliente
function deleteAgenda(callback) {
  const db = openDbConnection();
  db.run("DELETE FROM agenda", function (err) {
    db.close();
    callback(err, { changes: this.changes });
  });
}

function deleteSala(callback) {
  const db = openDbConnection();
  db.run("DELETE FROM sala", function (err) {
    db.close();
    callback(err, { changes: this.changes });
  });
}

function deleteEquipamento(callback) {
  const db = openDbConnection();
  db.run("DELETE FROM equipamento", function (err) {
    db.close();
    callback(err, { changes: this.changes });
  });
}

function deleteProfessor(callback) {
  const db = openDbConnection();
  db.run("DELETE FROM professor", function (err) {
    db.close();
    callback(err, { changes: this.changes });
  });
}

module.exports = {
  getAllAgenda,
  getAllSala,
  getAllEquipamento,
  getAllProfessor,
  updateAgenda,
  updateSala,
  updateEquipamento,
  updateProfessor,
  createAgenda,
  createSala,
  createEquipamento,
  createProfessor,
  deleteAgenda,
  deleteSala,
  deleteEquipamento,
  deleteProfessor
};
