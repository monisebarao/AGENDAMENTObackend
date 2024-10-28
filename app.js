const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

// Middleware para analisar o corpo das requisições em JSON
app.use(express.json());
app.use(cors());

// Importando as rotas do cliente
const Agenda1Routes = require('./routes/agenda1Routes'); // Certifique-se de que este arquivo existe
app.use('/agenda1', Agenda1Routes);

// Importando as rotas da sala
const SalaRoutes = require('./routes/salaRoutes'); // Certifique-se de que este arquivo também existe
app.use('/sala', SalaRoutes);

// Importando as rotas da sala
const Agenda2Routes = require('./routes/agenda2Routes'); // Certifique-se de que este arquivo também existe
app.use('/agenda2', Agenda2Routes);

// Importando as rotas da sala
const ProfessorRoutes = require('./routes/professorRoutes'); // Certifique-se de que este arquivo também existe
app.use('/professor', ProfessorRoutes);

// Importando as rotas da sala
const EquipamentoRoutes = require('./routes/equipamentoRoutes'); // Certifique-se de que este arquivo também existe
app.use('/equipamento', EquipamentoRoutes);

// Importando as rotas da sala
const salaConsultaRoutes = require('./routes/salaConsultaRoutes'); // Certifique-se de que este arquivo também existe
app.use('/salaConsulta', salaConsultaRoutes);

// Importando as rotas da sala
const equipamentoConsultaRoutes = require('./routes/equipamentoConsultaRoutes'); // Certifique-se de que este arquivo também existe
app.use('/equipamentoConsulta', equipamentoConsultaRoutes);





// Iniciando o servidor na porta especificada
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
