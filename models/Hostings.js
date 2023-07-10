const { DataTypes } = require("sequelize");

const sequelize = require("../utils/database");

const Hostings =  sequelize.define("hosting" , {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull : false
    },
    status:{
        type:DataTypes.INTEGER,
        defaultValue: 1,

    },
    hosting_name:{
        type:DataTypes.STRING,
        allowNull : true
    },
    booked_from:{
        type:DataTypes.STRING,
        allowNull : true
    },
    hosting_mailId:{
        type:DataTypes.STRING,
        allowNull : true
    },
    hosting_password:{
        type:DataTypes.STRING,
        allowNull : true
    },
    hosting_pin:{
        type:DataTypes.STRING,
        allowNull : true
    },
    registration_Date:{
        type:DataTypes.DATE,
        allowNull : true
    },
    expire_date:{
        type:DataTypes.DATE,
        allowNull : true
    },
    remark:{
        type:DataTypes.STRING,
        allowNull : true
    },
    hosting_amount:{
        type:DataTypes.STRING,
        allowNull : true
    },
    hosting_provider:{
        type:DataTypes.STRING,
        allowNull : true
    }


},{ paranoid: true ,timestamps: true })

module.exports = Hostings