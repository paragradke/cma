var express = require('express');
app = express();
var connection  = require('express-myconnection');
var mysql = require('mysql');
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

app.use(express.static('./public'))
.get('/', function(req, res) {
        res.sendfile('public/main.html');
    })
    .get('/api/customers', customers.list)
    .get('/api/customers/:id', customers.get)
    .post('/api/customers', customers.save)
    .delete('/api/customers/:id', customers.delete)
    .put('/api/customers/:id', customers.update)
    .listen(3000);