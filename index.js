const express = require('express')
const homeRoute = require('./routes/home');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express()
const port = 3000
mongoose.connect('mongodb://localhost:27017/nodejscrud', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error',()=>console.log("Something went wrong"));
db.once('open',()=>{
  console.log("DB connection has been made successfully");
})
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 

app.use('/',homeRoute)
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})