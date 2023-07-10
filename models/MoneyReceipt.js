const {DataTypes} = require("sequelize")

const sequelize = require("../utils/database")

const MoneyReceipt = sequelize.define("moneyReceipt" , {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull : false
    },
    client_name : {
        type:DataTypes.STRING,
        allowNull:true
    },
    client_mobile : {
        type:DataTypes.STRING,
        allowNull:true
    },
    shift_from : {
        type:DataTypes.STRING,
        allowNull:true
    },
    shift_to : {
        type:DataTypes.STRING,
        allowNull:true
    },
    shifting_date : {
        type:DataTypes.DATEONLY,
        allowNull:true
    },
    rsInWords : {
        type : DataTypes.STRING,
        allowNull : true
    },
    total : {
        type:DataTypes.STRING,
        allowNull:true
    },
    advance : {
        type:DataTypes.STRING,
        allowNull:true
    },
    balance : {
        type:DataTypes.STRING,
        allowNull:true
    },
} , { paranoid: true, timestamps: true })

module.exports = MoneyReceipt;