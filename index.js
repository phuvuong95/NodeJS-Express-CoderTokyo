var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); //Đi kèm với module body-parser
app.use(bodyParser.urlencoded({ extended: true })); //Đi kèm với mdule body-parser

var users = [
    { id: 1, name: 'Thinh' },
    { id: 2, name: 'Hung' },
    { id: 3, name: 'Vuong' }
];

app.get('/', function(req, res){  //get request: lấy dữ liệu và hiển thị lên trình duyệt
    res.render('index', {
        name: "AAA"
    });
});

app.get('/users', function(req, res){  //get request: lấy dữ liệu và hiển thị lên trình duyệt
    res.render('users/index', {
        users: users
    });
});

app.get('/users/search', function(req, res){
    var q = req.query.q;
    var matchedUsers = users.filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    
    res.render('users/index',{
       users: matchedUsers 
    });
});

app.get('/users/create', function(req, res){
    res.render('users/create');
});

app.post('/users/create', function(req, res){ //Dùng để trả lời khi nhận đc request
    users.push(req.body);
    res.redirect('/users');
});

app.listen(port, function(){
    console.log('Server listening on port ' + port);
});