// app.js
const express = require('express');
const app = express();
const port = 3000;
const cors = require ("cors")
// Middleware para analisar o corpo das requisições em JSON
app.use(express.json());
app.use(cors());
// Importando as rotas do cliente
const AgendaRoutes = require('./routes/agendaRoutes');
// Usando as rotas do cliente com o prefixo '/clientes'
app.use('/agenda', AgendaRoutes);
// Iniciando o servidor na porta especificada
const SalaRoutes = require('./routes/salaRoutes');
// Usando as rotas do cliente com o prefixo '/clientes'
app.use('/sala', SalaRoutes);
const EquipamentoRoutes = require('./routes/equipamentoRoutes');
// Usando as rotas do cliente com o prefixo '/clientes'
app.use('/equipamento', EquipamentoRoutes);
const ProfessorRoutes = require('./routes/professorRoutes');
// Usando as rotas do cliente com o prefixo '/clientes'
app.use('/professor', ProfessorRoutes);

app.listen(port, () => {
console.log(`Servidor rodando em http://localhost:${port}`);
});