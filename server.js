var express = require('express');
app = express();
var connection  = require('express-myconnection');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var customers = require('./routes/customers');
app.use(
    connection(mysql,{
        host: 'localhost',
        user: 'root',
        password : '',
        port : 3306,
        database:'remitr'
    },'single')
);
//Handles post requests
var jsonParser = bodyParser.json();

//Handles put requests
//app.use(express.methodOverride());

app.use(express.static('./public'))
.get('/', function(req, res) {
        res.sendfile('public/main.html');
    })
    .get('/api/customers', customers.list)
    .get('/api/customers/:id', customers.get)
    .post('/api/customers', jsonParser, customers.save)
    .delete('/api/customers/:id', customers.delete)
    .put('/api/customers/:id', customers.update)
    .post('/api/addproperty/customers/:id', jsonParser, customers.addproperty)
    .post('/api/removeproperty/customers/:id', jsonParser, customers.removeproperty)
    .post('/api/updateproperty/customers/:id', jsonParser, customers.updateproperty)
    .post('/api/updatepropertystatus/customers/:id', jsonParser, customers.updatepropertystatus)
    .listen(3000);