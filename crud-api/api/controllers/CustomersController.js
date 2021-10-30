
const Customer = require("../models/customermodels");
exports.create = async function(req, res) {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // // Create a Customer
  // const customer = new Customer({
  // store_id : req.body.store_id,
  // last_name : req.body.last_name,     (1)
  // first_name : req.body.first_name,
  // email : req.body.email,
  // address_id : req.body.address_id,
  // active : req.body.active
  // });

  const customer = {
    ...req.body
  }


  ///=> tuong duong (1) (spread operator)

  // Save Customer in the database


  console.log("body", customer)

  Customer.create(customer, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};
exports.findAll = async function(req, res) {
    Customer.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving customers."
        });
      else res.send(data);
    });
    return db(Customer)
  };
  // exports.findOne = async function(req, res) {
  //   Customer.findById(req.params.customerId, (err, data) => {
  //     if (err) {
  //       if (err.kind === "not_found") {
  //         res.status(404).send({
  //           message: `Not found Customer with id ${req.params.customerId}.`
  //         });
  //       } else {
  //         res.status(500).send({
  //           message: "Error retrieving Customer with id " + req.params.customerId
  //         });
  //       }
  //     } else res.send(data);
  //   });
  // };  
  exports.update = async function(req, res) {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Customer.updateById(
      req.params.customerId,
      new Customer(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer with customer_id ${req.params.customerId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Customer with id " + req.params.customerId
            });
          }
        } else res.send(data);
      }
    );
  };
  exports.delete = async function(req, res) {
    Customer.remove(req.params.customerId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.customerId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Customer with id " + req.params.customerId
          });
        }
      } else res.send({ message: `Customer was deleted successfully!` });
    });
  };

  exports.deleteAll = async function(req, res) {
    Customer.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all customers."
        });
      else res.send({ message: `All Customers were deleted successfully!` });
    });
  };

  exports.getCustomerByName = async function(req, res){
    //console.log('get emp by id');
    Customer.getCustomerByName(req.params.first_name, (err, employee)=>{
        if(err)
        res.send(err);
        console.log('single employee data',employee);
        res.send(employee);
    })
}