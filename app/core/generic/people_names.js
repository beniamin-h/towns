/**
 * Created by benek on 12/25/14.
 */
angular.module('towns').factory('PeopleNames', ['Math', function (Math) {

  var names = {
    'male':[
      'Ulrich',
      'Adam',
      'Aksel',
      'Albert',
      'Albin',
      'Alf',
      'Alfred',
      'Alvar',
      'Anders',
      'Anton',
      'Ari',
      'Aron',
      'Arthur',
      'August',
      'Bent',
      'Bernt',
      'Bosse',
      'Carl',
      'Casper',
      'Cristen',
      'Claus',
      'Daniel',
      'David',
      'Edvin',
      'Einer',
      'Elis',
      'Elof',
      'Emil',
      'Eric',
      'Erling',
      'Espen',
      'Fannar',
      'Filip',
      'Flemming',
      'Frans',
      'Frederik',
      'Frej',
      'Frode',
      'Gabriel',
      'Georg',
      'Gerd',
      'Gerhard',
      'Gotdfred'
    ],
    'female': [
      'Agathe',
      'Agnes',
      'Alexandra',
      'Alva',
      'Amanda',
      'Ane',
      'Anja',
      'Annika',
      'Astrid',
      'Beata',
      'Beatrice',
      'Birgit',
      'Bjorg',
      'Brita',
      'Camilla',
      'Carina',
      'Carola',
      'Cathrine',
      'Cecilia',
      'Charlotte',
      'Cristine',
      'Dorote',
      'Ebba',
      'Edit',
      'Eira',
      'Elin',
      'Elisabeth',
      'Ella',
      'Elsa',
      'Emma',
      'Erika',
      'Ester',
      'Eva',
      'Felicia',
      'Frida',
      'Froya',
      'Gina'
    ]
  };

  var getRandomNamePart = function (sex) {
    return names[sex][Math.floor(Math.random() * names[sex].length)];
  };

  return {
    getRandomName: function (sex) {
      return [getRandomNamePart(sex), getRandomNamePart(sex)].join(' ');
    }
  }
}]);

