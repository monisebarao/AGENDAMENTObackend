const Sala = require('../models/sala');

exports.getAllSala = (req, res) => {
    Sala.getAllSala((err, sala) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(sala);
        }
    });
  };

  exports.createSala = (req, res) => {
    Sala.createSala(req.body, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).json(result);
      }
    });
  };

  exports.updateSala = (req, res) => {
    Sala.updateSala(req.params.id, req.body, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else if (result.changes) {
        res.status(200).json(result);
      } else {
        res.status(404).send({ message: "Não encontrado" });
      }
    });
  };

  exports.deleteSala = (req, res) => {
    sala.deleteSala(req.params.id, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else if (result.changes) {
        res.status(200).json({ message: "Deletado com sucesso" });
      } else {
        res.status(404).send({ message: "Não encontrado" });
      }
    });
  };