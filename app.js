var express = require('express');

var app = express();
var routes = require('./routes/routes.js');

app.use(express.bodyParser());
app.use(express.cookieParser());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render("index", {checked: false, error: false});
});

app.get('/test', routes.get_test);

app.get('/*', function(req, res) {
    res.redirect('/', {checked: false, error: false});
});

app.post('/evaluate', routes.post_evaluate);

app.listen(8080);
console.log('Anagram Checker Server has started on port 8080');
