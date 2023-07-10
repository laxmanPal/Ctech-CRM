const { DataTypes } = require("sequelize");

const sequelize = require("../utils/database");

const HostingProvider = sequelize.define(
  "hosting_provider",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    hosting_provider_name :{
        type:DataTypes.STRING,
        allowNull : true
    }
  },
  { paranoid: true, timestamps: true }
);

module.exports = HostingProvider;
