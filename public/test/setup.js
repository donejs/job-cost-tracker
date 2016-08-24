const chai = require('chai');
const sinon = require('sinon');

module.exports = function(mocha) {
  sinon.assert.expose(chai.assert, { prefix: '' });
};
