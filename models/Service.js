const Sequelize = require('sequelize');
const db = require('../config/database');

const Service = db.define('service', {
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
  category: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Service;
