const {DataTypes} = require("sequelize")

const sequelize = require("../utils/database")

const Quotation = sequelize.define("quotation" , {
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
     quotation_date : {
        type:DataTypes.DATEONLY,
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
    transport_charge : {
        type:DataTypes.STRING,
        allowNull:true,
        defaultValue: 0,
    },
    transport_type : {
        type:DataTypes.STRING,
        allowNull:true
    },
    packing_charges : {
        type:DataTypes.STRING,
        allowNull:true
    },
    unpacking_charges : {
        type:DataTypes.STRING,
        allowNull:true
    },
    loading_charges : {
        type:DataTypes.STRING,
        allowNull:true
    },
    unloading_charges : {
        type:DataTypes.STRING,
        allowNull:true
    },
    car_charge : {
        type:DataTypes.STRING,
        allowNull:true
    },
    warehouse_charges : {
        type:DataTypes.STRING,
        allowNull:true
    },
    st_charges : {
        type:DataTypes.STRING,
        allowNull:true
    },
    mathadi_charges  : {
        type:DataTypes.STRING,
        allowNull:true
    },
    insurance_per : {
        type:DataTypes.STRING,
        allowNull:true
    },
    Insurance_type : {
        type:DataTypes.STRING,
        allowNull:true
    },
    gst_per : {
        type:DataTypes.STRING,
        allowNull:true
    },
    gst_type : {
        type:DataTypes.STRING,
        allowNull:true
    },
    gst_num : {
        type:DataTypes.STRING,
        allowNull:true
    },
    shifting_date : {
        type:DataTypes.DATEONLY,
        allowNull:true
    },
    token_amt : {
        type:DataTypes.STRING,
        allowNull:true
    },
    service_charge : {
        type:DataTypes.STRING,
        allowNull:true
    },
    service_charge_type : {
        type:DataTypes.STRING,
        allowNull:true
    }
} , { paranoid: true, timestamps: true })

module.exports = Quotation;