module.exports = function (express) {
	var routes = {};
	routes.contatos = require('./contatos')(express);
	return routes;
};
