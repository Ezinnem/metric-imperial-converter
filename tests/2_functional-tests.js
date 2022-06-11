const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');


chai.use(chaiHttp);
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();


suite('Functional Tests', function() {
    suite ("Function convertHandler.getUnit(input)", function (){
        test("For Each Valid Unit", function(done) {
          let input = [
            "gal",
            "L",
           "mi",
           "km",
           "lbs",
           "kg",
           "GAL",
           "L",
           "MI",
           "KM",
           "LBS",
           "KG"
          ];
    
          let output = [
           "gal",
           "L",
           "mi",
           "km",
           "lbs",
           "kg",
           "gal",
           "L",
           "mi",
           "km",
           "lbs",
           "kg",
          ];
          input.forEach(function (element,index) {
            assert.equal(convertHandler.getUnit(element), output[index])
          });
          done();
        });
    
        test("Unknown Unit", function(done){
          assert.equal(convertHandler.getUnit("34kilograms"), undefined)
          done();
        });
      });
    
      suite("Function convertHandler.getReturnUnit(initUnit)", function(){
        test("For each Valid Unit", function(done){
          let input = ["gal","l","mi","km","lbs","kg",];
          let expect = ["L", "gal", "km", "mi", "kg", "lbs"];
          input.forEach(function (element, i){
            assert.equal(convertHandler.getReturnUnit(element), expect[i])
          });
          done();
        })
      })
    
      suite("Function convertHandler.spellOutUnit(unit)", function(){
        test("For Each Valid Unit Inputs", function(done){
          let input = ["gal","l","mi","km","lbs","kg",];
          let expect = ["gallons","litres","miles","kilometers","pounds","kilograms",];
          input.forEach(function (element, i){
            assert.equal(convertHandler.spellOutUnit(element), expect[i])
          });
          done();
        })
      })
    
      suite("Function converHandler.convert(num, unit)", function(){
        test("Gal to L", function (done){
          let input = [5, "gal"];
          let expected = 18.9271;
          assert.approximately(
            convertHandler.convert(input[0], input[1]),
            expected,
            0.1
          );
          done();
        });
    
        test("L to Gal", function (done){
          let input = [5, "L"];
          let expected = 1.32086;
          assert.approximately(
            convertHandler.convert(input[0], input[1]),
            expected,
            0.1
          );
          done();
        });
    
        test("Mi to Km", function (done){
          let input = [5, "Mi"];
          let expected = 8.04671;
          assert.approximately(
            convertHandler.convert(input[0], input[1]),
            expected,
            0.1
          );
          done();
        });
    
        test("Km to Mi", function (done){
          let input = [5, "Km"];
          let expected = 3.12086;
          assert.approximately(
            convertHandler.convert(input[0], input[1]),
            expected,
            0.1
          );
          done();
        });
    
        test("Lbs to Kg", function (done){
          let input = [5, "Lbs"];
          let expected = 2.26769;
          assert.approximately(
            convertHandler.convert(input[0], input[1]),
            expected,
            0.1
          );
          done();
        });
    
        test("Kg to Lbs", function (done){
          let input = [5, "Kg"];
          let expected = 11.02312;
          assert.approximately(
            convertHandler.convert(input[0], input[1]),
            expected,
            0.1
          );
          done();
        });
      });
        
});
