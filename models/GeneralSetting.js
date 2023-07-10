const {DataTypes} = require("sequelize")

const sequelize = require("../utils/database")

const GeneralSetting = sequelize.define("generalSetting" , {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull : false
    },
    logoPath:{
        type:DataTypes.STRING,
        allowNull:false
    },
    color:{
        type : DataTypes.STRING
    }
} , { paranoid: true, timestamps: true })

module.exports = GeneralSetting;