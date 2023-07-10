const { DataTypes } = require("sequelize");

const sequelize = require("../utils/database");

const Customer = sequelize.define(
  "customer",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    cust_uni_id :{
      type:DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone_1: {
      type: DataTypes.BIGINT,
      allowNull : true
    },
    phone_2: {
      type: DataTypes.STRING,
    },
    phone_3: {
      type: DataTypes.STRING,
    },
    phone_4: {
      type: DataTypes.STRING,
    },
    comp_name: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.TEXT,
    },
    city: {
      type: DataTypes.STRING,
    },
    pincode: {
      type: DataTypes.INTEGER,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    roleId: {
      type: DataTypes.TINYINT,
      defaultValue: 2,
    },
    ban : {
      type : DataTypes.TINYINT,
      defaultValue: 0,
    }
  },
  { paranoid: true, timestamps: true }
);

module.exports = Customer;
