const expect = require('chai').expect;
const initMessage = require('../app/services/get').initMessage;
const checkProperties = require('../app/utilities/check').checkProperties;
const mapper = require('../app/utilities/TaskMapper');

// mocher - bouchonner les variables
const validUserPost = {
  'title': 'testtask',
  'description': 'blbl',
  'deadLine': new Date(),
  'complete': false
};

const invalidUserPost = {
  'title': 'test task',
  'description': 'blbl',
  'deadLine': false,
  'complete': false
};

const task = {
    "title": "Aperal team buildZDAZDAZDAZDAZDing: jnjnjnjnbjnj",
    "description": "Retirer 20 balles pour les clopesAeqfSFQSfASFAZfzdzdz",
    "deadLine": "2018-01-29T18:00:00.000Z",
    "createdAt": "2018-01-25T13:04:44.899Z",
    "updatedAt": "2018-01-26T15:06:47.347Z",
    "_id": "5a69d5ecfdc1702b60437e06",
    "__v": 0
}



/* *** *** IMPORTS *** *** */

describe('Test init message', () => {
  it('Should be an object', () => expect( initMessage() ).to.be.an('object'));
});

describe('Test Valid Check Properties', () => {
  it('Should be true', () => expect ( checkProperties(validUserPost) ).to.be.true);
});

describe('Test Invalid Check Properties', () => {
  it('Should be true', () => expect ( checkProperties(invalidUserPost) ).to.be.false);
});

describe('Test task mapper', () => {
  it('Should be true', () => expect( mapper(task) ).to.not.have.property('__v'));
})
