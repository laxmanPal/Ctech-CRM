const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controllers");
const Services = require("../models/Services");
const authMiddleware = require("../middleware/auth.middleware")

const { addCustomerValidation, addDomainValidation } = require("../utils/validations");




// Admin Dash Board
router.get("/" ,  authMiddleware.isAdmin , adminController.getDashboard);

// Customers List Routes
router.get("/customers" ,  authMiddleware.isAdmin, adminController.getCustomer);

router.get("/add-customer"   ,  authMiddleware.isAdmin, adminController.getAddCustomer )

router.post("/add-customer"  ,  authMiddleware.isAdmin , addCustomerValidation, adminController.AddCustomer)

router.get("/edit-customer/:id"  ,  authMiddleware.isAdmin, adminController.getEditCustomer)

router.post("/edit-customer"  ,  authMiddleware.isAdmin, adminController.editCustomer)

router.get("/cust_details/:id"  ,  authMiddleware.isAdmin, adminController.getCustDetails)

router.get("/remove-customer/:id"  ,  authMiddleware.isAdmin , adminController.removeCust)

router.post("/add-service"   ,  authMiddleware.isAdmin, adminController.addService)

// Domain Routes

router.get("/domains"  ,  authMiddleware.isAdmin, adminController.getDomain);

router.get("/add-domain"  ,  authMiddleware.isAdmin, adminController.getAddDomain )

router.get("/add-hosting" ,  authMiddleware.isAdmin , adminController.getAddHosting )

router.post("/add-domain",  authMiddleware.isAdmin , addDomainValidation , adminController.AddDomain);

router.post("/add-hosting",  authMiddleware.isAdmin , adminController.AddHosting);

// Hosting Provider Routes

router.get("/host-providers",  authMiddleware.isAdmin, adminController.getHostProviders);

// Services 

router.get("/services" ,  authMiddleware.isAdmin, adminController.getServices);

router.post("/add-services" ,  authMiddleware.isAdmin, adminController.addServices);


// All Quotations 

router.get("/quotation" , authMiddleware.isAdmin , adminController.getAllQuotations)

router.get("/downlaod_quotation/:id" , authMiddleware.isAdmin , adminController.downloadQuotation)

router.get("/remove-quotation/:id" , authMiddleware.isAdmin , adminController.removeQuotation)


// All Invoice 

router.get("/invoice" , authMiddleware.isAdmin , adminController.getAllInvoice)

router.get("/downlaod_invoice/:id" , authMiddleware.isAdmin , adminController.downloadInvoice)

router.get("/remove-invoice/:id" , authMiddleware.isAdmin , adminController.removeInvoice)

module.exports = router;