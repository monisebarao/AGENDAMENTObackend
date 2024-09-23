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

exports.getAllSala = (req, res) => {
  Agenda.getAllSala((err, sala) => {
      if (err) {
          res.status(500).send(err);
      } else {
          res.json(sala);
      }
  });
};

exports.getAllEquipamento = (req, res) => {
  Agenda.getAllEquipamento((err, equipamento) => {
      if (err) {
          res.status(500).send(err);
      } else {
          res.json(equipamento);
      }
  });
};

exports.getAllProfessor = (req, res) => {
  Agenda.getAllProfessor((err, professor) => {
      if (err) {
          res.status(500).send(err);
      } else {
          res.json(professor);
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

  exports.createSala = (req, res) => {
    Agenda.createSala(req.body, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).json(result);
      }
    });
  };

  exports.createEquipamento = (req, res) => {
    Agenda.createEquipamento(req.body, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).json(result);
      }
    });
  };

  exports.createProfessor = (req, res) => {
    Agenda.createProfessor(req.body, (err, result) => {
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

  exports.updateSala = (req, res) => {
    Agenda.updateSala(req.params.id, req.body, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else if (result.changes) {
        res.status(200).json(result);
      } else {
        res.status(404).send({ message: "Não encontrado" });
      }
    });
  };

  exports.updateEquipamento = (req, res) => {
    Agenda.updateEquipamento(req.body, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else if (result.changes) {
        res.status(200).json(result);
      } else {
        res.status(404).send({ message: "Não encontrado" });
      }
    });
  };

  exports.updateProfessor = (req, res) => {
    Agenda.updateProfessor(req.params.id, req.body, (err, result) => {
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

  exports.deleteSala = (req, res) => {
    Agenda.deleteSala(req.params.id, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else if (result.changes) {
        res.status(200).json({ message: "Deletado com sucesso" });
      } else {
        res.status(404).send({ message: "Não encontrado" });
      }
    });
  };

  exports.deleteEquipamento = (req, res) => {
    Agenda.deleteEquipamento( (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else if (result.changes) {
        res.status(200).json({ message: "Deletado com sucesso" });
      } else {
        res.status(404).send({ message: "Não encontrado" });
      }
    });
  };

  exports.deleteProfessor = (req, res) => {
    Agenda.deleteProfessor(req.params.id, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else if (result.changes) {
        res.status(200).json({ message: "Deletado com sucesso" });
      } else {
        res.status(404).send({ message: "Não encontrado" });
      }
    });
  };