'use strict';

const expect = require('chai').expect;
const convertHandler = require('../controllers/convertHandler.js');

module.exports = function(app) {
  app.get('/api/convert', (req, res) => {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
  
    if (isNaN(initNum) && initUnit === null) {
      return res.status(200).json('invalid number and unit');
    } else if (isNaN(initNum)) {
      return res.status(200).json('invalid number');
    } else if (initUnit === null) {
      return res.status(200).json('invalid unit');
    }
  
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
  
    res.status(200).json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: toString
    });
  });
  
};
