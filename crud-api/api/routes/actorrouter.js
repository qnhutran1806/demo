
module.exports = app => {
    const actors = require("../controllers/ActorController");
  
    
    app.post("/actors", actors.create);
  
    app.get("/actors",actors.findAll);
  
    // app.get("/actors/:actorId", actors.findOne);
  
    app.put("/actors/:actorId", actors.update);
  
    app.delete("/actors/:actorId", actors.delete);
  
    app.delete("/actors", actors.deleteAll);
    app.get('/actors/searchRecord/:first_name',actors.getCustomerByName);
   };