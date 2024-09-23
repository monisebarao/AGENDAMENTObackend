const Equipamento = require('../models/equipamento');

exports.getAllEquipamento = (req, res) => {
    Equipamento.getAllEquipamento((err, equipamento) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(equipamento);
        }
    });
  };

exports.createEquipamento = (req, res) => {
    Equipamento.createEquipamento(req.body, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).json(result);
      }
    });
  };

  exports.updateEquipamento = (req, res) => {
    Equipamento.updateEquipamento(req.body, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else if (result.changes) {
        res.status(200).json(result);
      } else {
        res.status(404).send({ message: "Não encontrado" });
      }
    });
  };
  
  exports.deleteEquipamento = (req, res) => {
   Equipamento.deleteEquipamento( (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else if (result.changes) {
        res.status(200).json({ message: "Deletado com sucesso" });
      } else {
        res.status(404).send({ message: "Não encontrado" });
      }
    });
  };