// models/userModel.js

// Importa o Request e os tipos de dados (TYPES) do pacote "tedious" para criar e executar consultas SQL
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

// Função para obter todos os usuários do banco de dados
async function getAllSala() {
  const query = "SELECT * FROM sala;";  // Define a query SQL para obter todos os registros da tabela "Users"
  return await executeQuery(query);  // Executa a query usando a função executeQuery
}

// Função para obter um usuário pelo ID
async function getSalaById(id) {
  const query = "SELECT * FROM sala WHERE cod_sala = @id;";  // Query SQL com um parâmetro para filtrar pelo ID
  const params = [{ name: "id", type: TYPES.Int, value: id }];  // Define o parâmetro @id para ser passado na query
  const sala = await executeQuery(query, params);  // Executa a query com os parâmetros
  return sala.length > 0 ? sala[0] : null;  // Retorna o primeiro usuário se houver algum resultado, ou null se não houver
}

// Função para criar um novo usuário
async function createSala(cod_sala, nome_sala) {
  const query = `INSERT INTO sala (cod_sala, nome_sala) VALUES (@cod_sala, @nome_sala);`;  // Query SQL para inserir um novo registro
  const params = [
    { name: "id", type: TYPES.Int, value: id },  // Define o parâmetro @name
    { name: "nome_sala", type: TYPES.NVarChar, value: nome_sala },  // Define o parâmetro @email
  ];
  await executeQuery(query, params);  // Executa a query com os parâmetros
}

// Função para atualizar um usuário existente
async function updateSala(id, nome_sala) {
  const query = `UPDATE sala SET id = @id, nome_sala = @nome_sala;`;  // Query SQL para atualizar o registro
  const params = [
    { name: "id", type: TYPES.Int, value: id },  // Define o parâmetro @id
    { name: "nome_sala", type: TYPES.NVarChar, value: nome_sala },  // Define o parâmetro @name
  ];
  await executeQuery(query, params);  // Executa a query com os parâmetros
}

// Função para deletar um usuário pelo ID
async function deleteSala(id) {
  const query = "DELETE FROM sala WHERE cod_sala = @id;";  // Query SQL para deletar o usuário pelo ID
  const params = [{ name: "id", type: TYPES.Int, value: id }];  // Define o parâmetro @id
  await executeQuery(query, params);  // Executa a query com o parâmetro
}

// Exporta as funções para serem usadas nos controllers
module.exports = {
  getAllSala,
  getSalaById,
  createSala,
  updateSala,
  deleteSala,
};