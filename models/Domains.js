const { DataTypes } = require("sequelize");

const sequelize = require("../utils/database");

const Domains =  sequelize.define("domain" , {
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
    domain_name:{
        type:DataTypes.STRING,
        allowNull : true
    },
    booked_from:{
        type:DataTypes.STRING,
        allowNull : true
    },
    doamin_mailId:{
        type:DataTypes.STRING,
        allowNull : true
    },
    domain_password:{
        type:DataTypes.STRING,
        allowNull : true
    },
    domain_pin:{
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
    domain_amount:{
        type:DataTypes.STRING,
        allowNull : true
    },
    hosting_provider:{
        type:DataTypes.STRING,
        allowNull : true
    }


},{ paranoid: true ,timestamps: true })

module.exports = Domains