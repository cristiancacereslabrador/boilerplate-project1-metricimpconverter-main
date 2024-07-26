function ConvertHandler() {
  this.getNum = function(input) {
    const result = input.match(/[.\d\/]+/g) || ["1"];
    const num = result[0];

    if (num.includes('/')) {
      const values = num.split('/');
      if (values.length != 2) return NaN;
      return parseFloat(values[0]) / parseFloat(values[1]);
    }

    return parseFloat(num);
  };
  
  this.getUnit = function(input) {
    const result = input.match(/[a-zA-Z]+/g);
    if (!result) return null;
    const unit = result[0].toLowerCase();
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    return validUnits.includes(unit) ? unit : null;
  };
  
  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      'gal': 'L',
      'l': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    return unitMap[initUnit.toLowerCase()];
  };

  this.spellOutUnit = function(unit) {
    const spellOutMap = {
      'gal': 'gallons',
      'l': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    return spellOutMap[unit.toLowerCase()];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit.toLowerCase()) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        result = NaN;
    }

    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
