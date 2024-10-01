const Professor = require('../models/professor');

exports.getAllProfessor = (req, res) => {
    Professor.getAllProfessor((err, professor) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(professor);
        }
    });
  };

  exports.createProfessor = (req, res) => {
    Professor.createProfessor(req.body, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).json(result);
      }
    });
  };

  exports.updateProfessor = (req, res) => {
    Professor.updateProfessor(req.params.id, req.body, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else if (result.changes) {
        res.status(200).json(result);
      } else {
        res.status(404).send({ message: "Não encontrado" });
      }
    });
  };

  exports.deleteProfessor = (req, res) => {
    Professor.deleteProfessor(req.params.id, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else if (result.changes) {
        res.status(200).json({ message: "Deletado com sucesso" });
      } else {
        res.status(404).send({ message: "Não encontrado" });
      }
    });
  };