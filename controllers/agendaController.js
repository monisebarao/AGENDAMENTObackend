const Agenda = require('../models/agenda');

exports.getAllAgenda = (req, res) => {
    Agenda.getAllAgenda((err, agenda) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(agenda);
        }
    });
};

exports.createAgenda = (req, res) => {
    Agenda.createAgenda(req.body, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).json(result);
      }
    });
  };
  
  // Controlador para atualizar um cliente existente
  exports.updateAgenda = (req, res) => {
    Agenda.updateAgenda(req.params.id, req.body, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else if (result.changes) {
        res.status(200).json(result);
      } else {
        res.status(404).send({ message: "Não encontrado" });
      }
    });
  };

  // Controlador para deletar um cliente
  exports.deleteAgenda = (req, res) => {
    Agenda.deleteAgenda(req.params.id, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else if (result.changes) {
        res.status(200).json({ message: "Deletado com sucesso" });
      } else {
        res.status(404).send({ message: "Não encontrado" });
      }
    });
  };