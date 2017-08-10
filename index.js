var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
var routes = require('./routes')(express);

app.use('/', express.static('app'));
app.use('/api/contatos', routes.contatos);
app.listen(3000, function () {
	console.log('server running on http://localhost:3000');
});
