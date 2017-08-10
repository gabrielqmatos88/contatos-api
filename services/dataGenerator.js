const faker = require('faker');
faker.locale = 'pt_BR';

const generator = {
	getContatcs: function () {
		var qtContatcs = faker.random.number({min: 6,max: 10});
		var contacts = [];
		for (var i = 0; i < qtContatcs; i++) {
			var generoN = faker.random.number({min: 0,max: 1});
			var genero = generoN === 0 ? 'feminino' : 'masculino';
			var c = {
				id: i + 1,
				nome: faker.name.findName(null, null, generoN) + ' ' + faker.name.lastName(),
				idade: faker.random.number({
					min: 17,
					max: 42
				}),
				avatar: faker.image.avatar(),
				telefone: faker.phone.phoneNumber()
				// genero : genero
			};
			contacts.push(c);
		}
		return contacts;
	}
};
module.exports = generator;
