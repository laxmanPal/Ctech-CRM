const { DataTypes } = require("sequelize");

const sequelize = require("../utils/database");

const Services = sequelize.define(
  "service",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    service_name :{
        type:DataTypes.STRING,
        allowNull : true
    }
  },
  { paranoid: true, timestamps: true }
);

module.exports = Services;
