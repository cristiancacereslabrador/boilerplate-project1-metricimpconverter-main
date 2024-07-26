function ConvertHandler() {
  this.getNum = function(input) {
    const result = input.match(/[.\d\/]+/g) || ["1"];
    const num = result[0];

    if (num.includes('/')) {
      const values = num.split('/');
      if (values.length !== 2 || isNaN(values[0]) || isNaN(values[1]) || parseFloat(values[1]) === 0) {
        return NaN; // Retornar NaN si hay más de 2 partes, o si no son números, o si el denominador es cero
      }
      return parseFloat(values[0]) / parseFloat(values[1]);
    }

    return isNaN(parseFloat(num)) ? NaN : parseFloat(num); // Asegúrate de manejar NaN aquí
  };

  this.getUnit = function(input) {
    const unit = input.match(/[a-zA-Z]+/g);
    if (!unit) return null;

    const validUnits = ['gal', 'l', 'lbs', 'kg', 'mi', 'km'];
    const unitStr = unit[0].toLowerCase();

    return validUnits.includes(unitStr) ? unitStr : null;
  };

  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      gal: 'L',
      l: 'gal',
      lbs: 'kg',
      kg: 'lbs',
      mi: 'km',
      km: 'mi'
    };

    const returnUnit = unitMap[initUnit.toLowerCase()] || null;
    return returnUnit ? returnUnit.toLowerCase() === 'l' ? 'L' : returnUnit.toLowerCase() : null; // Asegúrate de devolver 'L' si es litro
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
        result = initNum * galToL; // gal a L
        break;
      case 'l':
        result = initNum / galToL; // L a gal
        break;
      case 'lbs':
        result = initNum * lbsToKg; // lbs a kg
        break;
      case 'kg':
        result = initNum / lbsToKg; // kg a lbs
        break;
      case 'mi':
        result = initNum * miToKm; // mi a km
        break;
      case 'km':
        result = initNum / miToKm; // km a mi
        break;
      default:
        result = NaN; // Para unidades no válidas
    }

    return parseFloat(result.toFixed(5)); // Redondear a 5 decimales
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
