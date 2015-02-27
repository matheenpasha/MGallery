
module.exports = function(){
  var chai = GLOBAL.chai = require('chai');
  chai.use(require('chai-as-promised'));
  GLOBAL.expect=chai.expect;
  //var mocha = GLOBAL.mocha = require('mocha');
  //mocha.setup('bdd');
};
