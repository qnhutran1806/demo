const sql = require("./db");

// constructor
const Actor = function (actor) {
  this.first_name = actor.first_name;
  this.last_name = actor.last_name;
  return this;
 }
 Actor.create = (newActor, result) => {
    sql.query("INSERT INTO actor SET ?", newActor, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created actor: ", { id: res.insertId, ...newActor});
      result(null, { id: res.insertId, ...newActor });
    });
  };
  
  Actor.findById = (actorId, result) => {
    sql.query(`SELECT * FROM actor WHERE actor_id = ${actorId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found actor: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };
  
 Actor.getAll = result => {
    sql.query("SELECT * FROM actor", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("actor: ", res);
      result(null, res);
    });
  };

  Actor.updateById = (id, actor, result) => {
    sql.query(
      "UPDATE actor SET first_name = ?, last_name = ? WHERE actor_id = ?",
      [
        actor.first_name,
        actor.last_name, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated actor: ", { id: id, ...actor });
        result(null, { id: id, ...actor });
      }
    );
  };
  
  Actor.remove = (id, result) => {
    sql.query("DELETE FROM actor WHERE actor_id = ?", id, (err, res) => {
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
  
      console.log("deleted actor with id: ", id);
      result(null, res);
    });
  };
  
  Actor.removeAll = result => {
    sql.query("DELETE FROM actor", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} actor`);
      result(null, res);
    });
  };
  Actor.getCustomerByName = (first_name, result)=>{
    sql.query('SELECT * FROM actor WHERE first_name LIKE ?', first_name+'%', (err, res)=>{
        if(err){
            console.log('Error while fetching employee by id', err);
            result(null, err);
        }else{
            result(null, res);
        }
    })
  }

  module.exports = Actor;