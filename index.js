var express = require('express');
var app = express();

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', function(req, res){  //get request: lấy dữ liệu và hiển thị lên trình duyệt
    res.render('index', {
        name: "AAA"
    });
});

app.get('/users', function(req, res){  //get request: lấy dữ liệu và hiển thị lên trình duyệt
    res.render('users/index', {
        users: [
            { id: 1, name: 'Thinh' },
            { id: 2, name: 'Hung'}
        ]
    });
});

app.listen(port, function(){
    console.log('Server listening on port ' + port);
});