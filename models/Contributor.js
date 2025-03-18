const Sequelize = require('sequelize');
const db = require('../config/database');

const Contributor = db.define('contributor', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false
  },
  hourlyRate: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
});

module.exports = Contributor;
