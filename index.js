var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var low = require('lowdb'); //from document on website
var FileSync = require('lowdb/adapters/FileSync'); //from document on website
var adapter = new FileSync('db.json'); //from document on website
var shortid = require('shortid');

db = low(adapter);

db.defaults({ users: [] }) //from document on website
  .write()

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); //Đi kèm với module body-parser
app.use(bodyParser.urlencoded({ extended: true })); //Đi kèm với mdule body-parser


app.get('/', function(req, res){  //get request: lấy dữ liệu và hiển thị lên trình duyệt
    res.render('index', {
        name: "AAA"
    });
});

app.get('/users', function(req, res) {  //get request: lấy dữ liệu và hiển thị lên trình duyệt
    res.render('users/index', {
        users: db.get('users').value()
    });
});

app.get('/users/search', function(req, res) {
    var q = req.query.q;
    var matchedUsers = db.get('users').filter(function(user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    
    res.render('users/index', {
       users: matchedUsers
    });
});

app.get('/users/create', function(req, res) {
    res.render('users/create');
});

app.get('/users/:id', function(req, res){
    var id = req.params.id;

    var user = db.get('users').find({ id: id }).value();
    

    res.render('users/view', {
       user: user 
    });
});

app.post('/users/create', function(req, res){ //Dùng để trả lời khi nhận đc request
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
});

app.listen(port, function(){
    console.log('Server listening on port ' + port);
});