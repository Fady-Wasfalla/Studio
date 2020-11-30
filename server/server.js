const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')


app.use(bodyParser.json({limit: '50mb', extended: true}))


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
  // mongodb://localhost:27017/Studio 
mongoose.connect("mongodb+srv://Memy:Studio1234@studio.welxb.mongodb.net/<dbname>?retryWrites=true&w=majority" , { useNewUrlParser: true , useUnifiedTopology: true})
    .then(() => console.log("Mongoose is connected xD ..."))
    .catch(err => console.log(err));

app.use('/', routes)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is run on port ${port}`))