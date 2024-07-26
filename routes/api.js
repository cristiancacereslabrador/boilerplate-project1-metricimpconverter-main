'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function(app) {
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
  
    // Verifica si ambos son inválidos
    if (isNaN(initNum) && initUnit === null) {
      return res.status(200).json('invalid number and unit');
    } else if (isNaN(initNum)) {
      return res.status(200).json('invalid number');
    } else if (initUnit === null) {
      return res.status(200).json('invalid unit');
    }
  
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const toString = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
  
    res.status(200).json({
      initNum,
      initUnit: initUnit.toLowerCase(), // Asegúrate de que la unidad inicial esté en minúsculas
      returnNum,
      returnUnit: returnUnit.toLowerCase(), // Asegúrate de que la unidad de retorno esté en minúsculas
      string: toString
    });
  });
  
};
