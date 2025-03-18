const Sequelize = require('sequelize');
const db = require('../config/database');
const SubService = require('./SubService');
const Contributor = require('./Contributor');

const Estimate = db.define('estimate', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  clientName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  estimatedTotal: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  items: {
    type: Sequelize.JSON,
    allowNull: false
  }
});

module.exports = Estimate;
