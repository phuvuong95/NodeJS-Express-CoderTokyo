var db = require('../db');
var shortid = require('shortid');

module.exports.index = function(req, res) {  //get request: lấy dữ liệu và hiển thị lên trình duyệt
    res.render('users/index', {
        users: db.get('users').value()
    });
}

module.exports.search = function(req, res) {
    var q = req.query.q;
    var matchedUsers = db.get('users').value().filter(function(user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    
    res.render('users/index', {
       users: matchedUsers
    });
}

module.exports.create = function(req, res) {
    res.render('users/create');
}

module.exports.get = function(req, res){
    var id = req.params.id;

    var user = db.get('users').find({ id: id }).value();
    

    res.render('users/view', {
       user: user 
    });
}

module.exports.postCreate = function(req, res){ //Dùng để trả lời khi nhận đc request
    req.body.id = shortid.generate();
    
    db.get('users').push(req.body).write();
    res.redirect('/users');
}