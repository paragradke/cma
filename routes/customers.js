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

            connection.query('SELECT name FROM roles where id = ?', user.roleId, function(err, rows) {
                if(err) {
                    console.log("Error Selecting : %s ", err);
                }
                user['role'] = rows[0].name;
                user = processUserObject(user);

                connection.query('SELECT name , value , type , status FROM userProperties where userId = ?', user.id[0], function(err, rows) {
                    if(err) {
                        console.log("Error Selecting : %s ", err);
                    }
                    properties = rows;
                    async.eachSeries(properties, function (property, callback) {
                        var user_property = {};
                        user[property.name] = [property.value, property.type, property.status];
                        callback();
                    }, function (err) {
                        if (err) {
                            throw err;
                        }
                        console.log('Well done :-)!');
                        console.log(user);
                        res.json(user);
                    });
                });
            });
        });
    });
};

getPropertyFromRequest = function(input) {
    var property = {};
    var value = [];
    var propertyName ;
    Object.keys(input).forEach(function(key) {
        propertyName = key;
        value = input[key];
    });
    property['name'] = propertyName;
    property['value'] = value[0];
    property['type'] = value[1];
    property['status'] = value[2];
    return property;
};

processUserObject = function(user) {
    var newUser = {};
    Object.keys(user).forEach(function(key) {
        var newValue = [];
        newValue.push(user[key]);
        newValue.push('');
        newValue.push('commited');
        newUser[key] = newValue;
    });
    console.log("new user");
    console.log(newUser);
    return newUser;
};

exports.update = function(req, res) {
    console.log("update called" + req);
};

exports.delete = function(req, res) {
    console.log("delete called" + req);
};

exports.addproperty = function(req, res) {
    console.log("add property called");
    console.log(req.body);
    var input = JSON.parse(JSON.stringify(req.body));
    var property = getPropertyFromRequest(input);
    property['userId'] = req.params.id;
    console.log(property);

    req.getConnection(function (err, connection) {
        var query = connection.query("INSERT INTO userProperties set ? ", property, function (err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
            }

            res.json(rows[0]);
        });
    });
};

exports.removeproperty = function(req, res) {
    console.log("remove property called");
    var input = JSON.parse(JSON.stringify(req.body));
    var property = getPropertyFromRequest(input);
    property['userId'] = req.params.id;
    console.log(property);

    req.getConnection(function (err, connection) {
        var query = connection.query("DELETE from userProperties set ? ", property, function (err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err);
            }

            res.json(rows[0]);
        });
    });
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