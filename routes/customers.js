var async = require('async');
var uuid = require('uuid');

exports.list = function(req, res) {
   console.log("list called" + req);
    var users = [];
    req.getConnection(function(err, connection) {
        connection.query('SELECT * FROM users',function(err, rows) {
            if(err) {
                console.log("Error Selecting : %s ", err);
            }
            console.log(rows);
            async.eachSeries(rows, function (row, callback) {
                var user = row;
                //callback(); // Alternatively: callback(new Error());
                connection.query('SELECT name FROM roles where id = ?',user.roleId ,function(err, rows) {
                    if(err) {
                        console.log("Error Selecting : %s ", err);
                    }
                    console.log(rows);
                    user['role'] = rows[0].name;
                    connection.query('SELECT * FROM userProperties where userId = ?',user.id ,function(err, rows) {
                        if(err) {
                            console.log("Error Selecting : %s ", err);
                        }
                        console.log(rows);
                        user['properties'] = rows;
                        users.push(user);
                        callback();
                    });
                });
            }, function (err) {
                if (err) { throw err; }
                console.log('Well done :-)!');
                res.json(users);
            });
        });
    });
};

exports.get = function(req, res) {
    console.log("get called" + req);
    var id = req.params.id;
    console.log(id);
    req.getConnection(function(err, connection) {
        connection.query('SELECT * FROM users where id = ?', id, function(err, rows) {
            console.log(rows);
            if(err) {
                console.log("Error Selecting : %s ", err);
            }
            var user = rows[0];

            connection.query('SELECT name FROM roles where userId = ?', id, function(err, rows) {
                if(err) {
                    console.log("Error Selecting : %s ", err);
                }
                user['role'] = rows[0].name;
            });

            res.json(user);
        });
    });
};

exports.update = function(req, res) {
    console.log("update called" + req);
};

exports.delete = function(req, res) {
    console.log("delete called" + req);
};

exports.save = function(req, res) {
    console.log("save called" + req);
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
        var query = connection.query("select id from roles where name = ? ", input.role, function (err, rows) {
            var roleId = rows[0];
            var data = {
                first_name: input.first_name,
                middle_name: input.middle_name,
                last_name: input.last_name,
                email: input.email,
                date_of_birth: input.date_of_birth,
                account_no: input.account_no,
                roleId : roleId,
                guid: uuid.v4()
            };
            connection.query("INSERT INTO users set ? ", data, function (err, rows) {
                if (err) {
                    console.log("Error inserting : %s ", err);
                }
                var user = rows[0];
                var properties = input.properties;
                var user_properties = [];
                async.eachSeries(properties, function (property, callback) {
                    property['userId'] = rows[0].id;
                    connection.query('INSERT INTO userProperties set ', property, function (err, rows) {
                        if (err) {
                            console.log("Error Selecting : %s ", err);
                            callback(new Error());
                        }
                        user_properties.push(rows[0]);
                        console.log(rows);
                        callback();
                    });
                }, function (err) {
                    if (err) {
                        throw err;
                    }
                    user['properties'] = user_properties;
                    console.log('Well done :-)!');
                    console.log(user);
                    res.json(user);
                });
            });
        });
    });
};