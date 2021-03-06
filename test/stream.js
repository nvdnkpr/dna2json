var dna2json = require('../');
var should = require('should');
var fs = require('fs');
var path = require('path');
require('mocha');

var fakedna = "";
fakedna += "# comment\n";
fakedna += "rs4477212 1 82154 AA\n";

var expected = {
  id: "rs4477212",
  chromosome: 1,
  position: 82154,
  genotype: "AA"
};

describe('dna2json', function() {

  describe('createParser()', function() {
    it('should return a stream', function(done) {
      var parser = dna2json.createParser();
      should.exist(parser);
      done();
    });

    it('should return a stream that parses SNP objects', function(done) {
      var parser = dna2json.createParser();

      parser.on("data", function(snp){
        should.exist(snp);
        should.exist(snp.id);
        should.exist(snp.chromosome);
        should.exist(snp.position);
        should.exist(snp.genotype);
        snp.should.eql(expected);
        done();
      });
      parser.once('error', done);

      parser.write(fakedna);
    });
  });

});
