const { DataTypes } = require("sequelize");

const sequelize = require("../utils/database");

const BankDetails = sequelize.define(
  "bankDetail",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    bankName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    accNum: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ifsc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    paytm: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    gPay: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    phonePay: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  { paranoid: true, timestamps: true }
);

module.exports = BankDetails;
