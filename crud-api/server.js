const express = require('express')
const app = express()
const bodyParser = require("body-parser");
// require('dotenv').config()
//const dotenvLoad = require('dotenv-load');
//dotenvLoad();
const port = process.env.PORT || 3000
const cors = require ("cors")
app.use (
  cors(
    {
      origin:"http://localhost:8000"
    }
  )
)
app.use(express.json());

// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", (req, res) => {
    res.json({ message: "Hello world." });
  });



require("./api/routes/customerrouter")(app);
require("./api/routes/actorrouter")(app);


app.listen(port)


console.log('RESTful API server started on: ' + port)



