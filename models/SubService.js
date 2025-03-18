const Sequelize = require('sequelize');
const db = require('../config/database');
const Service = require('./Service');

const SubService = db.define('subservice', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  estimatedHours: {
    type: Sequelize.FLOAT,
    defaultValue: 1
  }
});

SubService.belongsTo(Service);
Service.hasMany(SubService);

module.exports = SubService;
