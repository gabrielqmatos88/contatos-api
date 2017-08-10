var Validator = require('jsonschema').Validator;
var _ = require('underscore-node');
var contatoSchema = require('../schemas/contatos');
var dataGenerator = require('../services/dataGenerator');

var _validator = new Validator();

module.exports = function (express) {
	var contatos = dataGenerator.getContatcs();
	var index = contatos.length + 1;
	var route = express.Router();
	route.use(function (req, res, next) {
		res.set('Content-Type', 'application/json');
		next();
	});

	//listar contatos
	route.get('/:id?', function (req, res) {
		console.log(req.params);
		if (!!req.params.id) {
			var contato = _.find(contatos, function (c) {
				return c.id == req.params.id;
			});
			if (!contato) {
				res.status(404).send({
					errors: [{
						status: 404,
						message: 'not found'
					}]
				});
				return;
			}
			res.send(contato);
		}
		return res.send(contatos);
	});

	route.put('/:id', function (req, res) {
		if (!req.params.id) {
			res.status(400).send({
				errors: [{
					status: 400,
					message: 'invalid id'
				}]
			});
			return;
		}

		var schema = _validator.validate(req.body, contatoSchema);
		if (schema.errors.length) {
			res.status(400)
				.send({
					errors: schema.errors
				});
			return;
		};

		var contato = _.find(contatos, function (c) {
			return c.id == req.params.id;
		});

		if (!contato) {
			res.status(404).send({
				errors: [{
					status: 404,
					message: 'not found'
				}]
			});
			return;
		}

		contato.nome = req.body.nome;
		contato.telefone = req.body.telefone;
		if(!!req.body.avatar){
			contato.avatar = req.body.avatar;
		}
		contato.idade = req.body.idade;
		res.status(200).send();
	});

	route.delete('/:id', function (req, res) {
		if (!!req.params.id) {
			var result = contatos.filter(function (c) {
				return c.id !== parseInt(req.params.id);
			});
			if (result.length === contatos.length) {
				res.status(404).send({
					errors: [{
						status: 404,
						message: 'not found'
					}]
				});
				return;
			}
			contatos = result;
			res.status(200)
				.send();
			return;
		}
		return res.status(400).send({
			errors: [{
				code: 400,
				message: 'invalid id'
			}]
		});
	});

	//novo contato
	route.post('/', function (req, res) {
		var schema = _validator.validate(req.body, contatoSchema);
		if (schema.errors.length) {
			res.status(400)
				.send({
					errors: schema.errors
				});
			return;
		};
		var contato = req.body;
		contato.id = index;
		index++;
		contatos.push(contato);
		return res.status(201).send(contato);
	});
	return route;
};
