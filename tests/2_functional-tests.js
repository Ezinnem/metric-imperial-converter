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
        
        test('Invalid Number (Double fraction)', function(done){
            let input = '2/4/25L';
            assert.equal(convertHandler.getNum(input), undefined);
            done();
          });
      })
});
