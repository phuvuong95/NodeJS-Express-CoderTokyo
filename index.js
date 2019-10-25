require('dotenv').config();


var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');

var authMiddleware = require('./middlewares/auth.middleware');

var port = 3000;

var app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); //Đi kèm với module body-parser
app.use(bodyParser.urlencoded({ extended: true })); //Đi kèm với mdule body-parser
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(express.static('public')); //Đường dẫn đến folder public chứa file css


app.get('/', function(req, res){  //get request: lấy dữ liệu và hiển thị lên trình duyệt
    res.render('index', {
        name: "AAA"
    });
});

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);


app.listen(port, function(){
    console.log('Server listening on port ' + port);
});