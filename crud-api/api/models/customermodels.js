const sql = require("./db");

// constructor
const Customer = function (customer) {
  this.store_id = customer.store_id;
  this.last_name = customer.last_name;
  this.first_name = customer.first_name;
  this.email = customer.email;
  this.address_id = customer.address_id;
  this.active = customer.active;
  return this;
 }
Customer.create = (newCustomer, result) => {
  sql.query("INSERT INTO customer SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newCustomer });
  });
};

// Customer.findById = (customerId, result) => {
//   sql.query(`SELECT * FROM customer WHERE customer_id = ${customerId}`, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     if (res.length) {
//       console.log("found customer: ", res[0]);
//       result(null, res[0]);
//       return;
//     }

//     // not found Customer with the id
//     result({ kind: "not_found" }, null);
//   });
// };

Customer.getAll = result => {
  sql.query("SELECT * FROM customer", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("customer: ", res);
    result(null, res);
  });
};
Customer.getCustomerByName = (first_name, result)=>{
  sql.query('SELECT * FROM customer WHERE first_name LIKE ?', first_name+'%', (err, res)=>{
      if(err){
          console.log('Error while fetching employee by id', err);
          result(null, err);
      }else{
          result(null, res);
      }
  })
}
Customer.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE customer SET first_name = ?, last_name = ?, email = ?, address_id = ?, active = ? WHERE customer_id = ?",
    [
      customer.first_name,
      customer.last_name,
      customer.email,
      customer.address_id,
      customer.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};
Customer.removeAll = result => {
  sql.query("DELETE FROM customer", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} customer`);
    result(null, res);
  });
};


// Customer.remove = (async(customerID) =>{

//   function deletePayment(db , customerID)
// {
// 	return new Promise((resolve, reject)=>{
// 		db.query("DELETE FROM `payment` WHERE `customer_id` = '"+customerID+"' ", (err, result)=>{
// 		if(err)
// 		{
// 			reject(err)	
			
// 		}
// 		else
// 		{
// 			resolve(true)
// 		}
	
// 	})

// 	});
	
// };

// function deleteCustomer(db, customerID)
// {

// 	return new Promise((resolve, reject)=>{
// 		db.query("DELETE FROM `customer` WHERE `customer_id` = '"+customerID+"' ", (err, result)=>{
// 		if(err)
// 		{
// 			reject(err)	
			
// 		}
// 		else
// 		{

// 			resolve(true)
// 		}
// 	});
// });

// 	try
// 	{
// 		//wait for delete payment have finished
// 		await deletePayment(sql, customerID);
// 		await deleteCustomer(sql, customerID);
// 	}
// 	catch(error)
// 	{
// 		consolve.log(error)
// 	}

// };
Customer.remove = (id, result) => {
  sql.query("DELETE FROM customer WHERE customer_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted customer with id: ", id);
    result(null, res);
  });
};



module.exports = Customer;