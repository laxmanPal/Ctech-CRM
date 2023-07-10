const { check } = require("express-validator");

exports.addDomainValidation = [
    check("cust_name").notEmpty().withMessage("Please Select Customer"),
    check("domain_name").isFQDN().withMessage("Domain Name Invalid"),
    check("login_id").isEmail().withMessage("Domain Login ID Invalid"),
    check("password").notEmpty().withMessage("Password Cannot Be Empty"),
    check("reg_date").notEmpty().withMessage("Registration Date Cannot Be Empty").isDate().withMessage("Registration Date Invalid"),
    check("exp_date").notEmpty().withMessage("Expire Date Cannot Be Empty").isDate().withMessage("Expire Date Invalid"),
    check("renew_amt").isInt().withMessage("Renewal Amount Invalid"),
    check("hosting_provider").notEmpty().withMessage("Please Select Hosting Provider"),
    check("pin").isInt().withMessage("Pin Invalid"),
    check('book_from').notEmpty().withMessage(" Please Enter Domain Booked From"),
    check("status").notEmpty().withMessage("Please Select Status")
];


exports.addCustomerValidation = [
    check("cust_name").notEmpty().withMessage("Customer Cannot be empty"),
    check("cust_email").isEmail().withMessage("Invalid Email"),
    check("cust_phone_1").isMobilePhone().withMessage("Phone Number Invalid"),
    check("address").isLength({ min: 3 }).withMessage("Address is required"),
    check("city").isLength({ min: 3 }).withMessage("City is required"),
    check("pincode").isLength({ min: 6, max: 6 }).withMessage("Invalid Pincode"),
    check("password").isLength({ min: 6 }).withMessage("Password Must Be Minimum 6")
];

exports.loginValidation = [
    check('email').notEmpty().withMessage('Email is required'),
    check('password').notEmpty().withMessage('Password is required')
];


exports.addQuotationValidation = [
    check("client_name").notEmpty().withMessage("Client Name Cannot be empty"),
    check("client_mobile").isMobilePhone().withMessage("Phone Number Invalid"),
    check("shift_from").notEmpty().withMessage("Shifting From Cannot be empty"),
    check("shift_to").notEmpty().withMessage("Shifting To Cannot be empty"),
    check("transport_type").notEmpty().withMessage("Please Select Transportation Type"),
    check("transport_charge").notEmpty().withMessage("Please Enter Transportation Charges"),
    check("packing_charges").notEmpty().withMessage("Please Enter Packing Charges"),
    check("unpacking_charges").notEmpty().withMessage("Please Enter Unpacking Charges"),
    check("loading_charges").notEmpty().withMessage("Please Enter Loading Charges"),
    check("unloading_charges").notEmpty().withMessage("Please Enter Unloading Charges"),
    check("car_charge").notEmpty().withMessage("Please Enter Car Transportation inclusive Charges"),
    check("warehouse_charges").notEmpty().withMessage("Please Enter Warehouse Charges"),
    check("st_charges").notEmpty().withMessage("Please Enter St. Charges"),
    check("mathadi_charges").notEmpty().withMessage("Please Enter Mathadi Union & Carpenter Charges"),
    check("insurance_per").notEmpty().withMessage("Please Enter Insurance Percentage"),
    check("Insurance_type").notEmpty().withMessage("Please Enter Insurance Type"),
    check("gst_per").notEmpty().withMessage("Please Enter GST Percentage"),
    check("gst_type").notEmpty().withMessage("Please Enter GST Type"),
    check("gst_num").notEmpty().withMessage("Please Enter GST Number"),
    check("shifting_date").notEmpty().withMessage("Please Enter Shifting Date").isDate().withMessage("Shifting Date Invalid"),
    check("token_amt").notEmpty().withMessage("Please Enter Token Money"),
    check("service_charge").notEmpty().withMessage("Please Enter Service Charge Percentage"),
    check("service_charge_type").notEmpty().withMessage("Please Enter Service Charge Type"),
]


exports.addInvoiceValidation = [
    check("client_name").notEmpty().withMessage("Client Name Cannot be empty"),
    check("client_mobile").isMobilePhone().withMessage("Phone Number Invalid"),
    check("shift_from").notEmpty().withMessage("Shifting From Cannot be empty"),
    check("shift_to").notEmpty().withMessage("Shifting To Cannot be empty"),
    check("transport_type").notEmpty().withMessage("Please Select Transportation Type"),
    check("transport_charge").notEmpty().withMessage("Please Enter Transportation Charges"),
    check("packing_charges").notEmpty().withMessage("Please Enter Packing Charges"),
    check("unpacking_charges").notEmpty().withMessage("Please Enter Unpacking Charges"),
    check("loading_charges").notEmpty().withMessage("Please Enter Loading Charges"),
    check("unloading_charges").notEmpty().withMessage("Please Enter Unloading Charges"),
    check("car_charge").notEmpty().withMessage("Please Enter Car Transportation inclusive Charges"),
    check("warehouse_charges").notEmpty().withMessage("Please Enter Warehouse Charges"),
    check("st_charges").notEmpty().withMessage("Please Enter St. Charges"),
    check("mathadi_charges").notEmpty().withMessage("Please Enter Mathadi Union & Carpenter Charges"),
    check("insurance_per").notEmpty().withMessage("Please Enter Insurance Percentage"),
    check("Insurance_type").notEmpty().withMessage("Please Enter Insurance Type"),
    check("sgst_per").notEmpty().withMessage("Please Enter SGST Percentage"),
    check("sgst_num").notEmpty().withMessage("Please Enter SGST Number"),
    check("cgst_per").notEmpty().withMessage("Please Enter CGST Percentage"),
    check("cgst_num").notEmpty().withMessage("Please Enter CGST Number"),
    check("shifting_date").notEmpty().withMessage("Please Enter Shifting Date").isDate().withMessage("Shifting Date Invalid"),
    check("token_amt").notEmpty().withMessage("Please Enter Token Money"),
    check("service_charge").notEmpty().withMessage("Please Enter Service Charge Percentage"),
    check("service_charge_type").notEmpty().withMessage("Please Enter Service Charge Type"),
]