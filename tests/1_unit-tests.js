const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  test('convertHandler should correctly read a whole number input', function() {
    assert.equal(convertHandler.getNum('32L'), 32);
  });

  test('convertHandler should correctly read a decimal number input', function() {
    assert.equal(convertHandler.getNum('32.5L'), 32.5);
  });

  test('convertHandler should correctly read a fractional input', function() {
    assert.equal(convertHandler.getNum('1/2L'), 0.5);
  });

  test('convertHandler should correctly read a fractional input with a decimal', function() {
    assert.equal(convertHandler.getNum('5.4/3L'), 1.8);
  });

  test('convertHandler should correctly return an error on a double-fraction', function() {
    assert.isNaN(convertHandler.getNum('3/2/3L'));
  });

  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function() {
    assert.equal(convertHandler.getNum('L'), 1);
  });

  test('convertHandler should correctly read each valid input unit', function() {
    const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    const expect = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    input.forEach((ele, i) => {
      assert.equal(convertHandler.getUnit(ele), expect[i]);
    });
  });

  test('convertHandler should correctly return an error for an invalid input unit', function() {
    assert.isNull(convertHandler.getUnit('32g'));
  });

  test('convertHandler should return the correct return unit for each valid input unit', function() {
    const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    const expect = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
    input.forEach((ele, i) => {
      assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
    });
  });

  test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function() {
    const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    const expect = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
    input.forEach((ele, i) => {
      assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
    });
  });

  test('convertHandler should correctly convert gal to L', function() {
    assert.approximately(convertHandler.convert(5, 'gal'), 18.9271, 0.1);
  });

  test('convertHandler should correctly convert L to gal', function() {
    assert.approximately(convertHandler.convert(5, 'L'), 1.32086, 0.1);
  });

  test('convertHandler should correctly convert mi to km', function() {
    assert.approximately(convertHandler.convert(5, 'mi'), 8.0467, 0.1);
  });

  test('convertHandler should correctly convert km to mi', function() {
    assert.approximately(convertHandler.convert(5, 'km'), 3.10686, 0.1);
  });

  test('convertHandler should correctly convert lbs to kg', function() {
    assert.approximately(convertHandler.convert(5, 'lbs'), 2.26796, 0.1);
  });

  test('convertHandler should correctly convert kg to lbs', function() {
    assert.approximately(convertHandler.convert(5, 'kg'), 11.0231, 0.1);
  });
});
