

const Actor = require("../models/actormodels");
exports.create = async function(req, res) {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // const actor = new Actor({
  // first_name : req.body.first_name,
  // last_name : req.body.last_name,

  // });
  const actor = {
    ...req.body
  }

  // Save in the database
  Actor.create(actor, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};


exports.findAll = async function(req, res) {
    Actor.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving customers."
        });
      else res.send(data);
    });
    return db(Actor)
  };


  exports.findOne = async function(req, res) {
    Actor.findById(req.params.actorId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.actorId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Customer with id " + req.params.actorId
          });
        }
      } else res.send(data);
    });
  };  
  exports.update = async function(req, res) {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    Actor.updateById(
      req.params.actorId,
      new Actor(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer with actor_id ${req.params.actorId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Customer with id " + req.params.actorId
            });
          }
        } else res.send(data);
      }
    );
  };
  exports.delete = async function(req, res) {
    Actor.remove(req.params.actorId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.actorId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Customer with id " + req.params.actorId
          });
        }
      } else res.send({ message: `Actor was deleted successfully!` });
    });
  };
  
  exports.deleteAll = async function(req, res) {
    Actor.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all actors."
        });
      else res.send({ message: `All Actors were deleted successfully!` });
    });
  };
  exports.getCustomerByName = async function(req, res){
    //console.log('get emp by id');
    Actor.getCustomerByName(req.params.first_name, (err, employee)=>{
        if(err)
        res.send(err);
        console.log('single employee data',employee);
        res.send(employee);
    })
}