const faker = require('faker');
faker.locale = 'pt_BR';

for (var i = 0; i < 15; i++) {
    console.log('phone:', faker.phone.phoneNumber());
}
console.log(faker.image.avatar());
