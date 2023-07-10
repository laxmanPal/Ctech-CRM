const express = require("express");
const router = express.Router();
const custController = require("../controllers/customer.controllers");
const authMiddleware = require("../middleware/auth.middleware");
const { addQuotationValidation, addInvoiceValidation } = require("../utils/validations");

router.get("/" ,  authMiddleware.isLogin , custController.getDashboard );


// Quotataion
router.get("/myQuotations" , authMiddleware.isLogin , custController.getMyQuotations);

router.get("/add-quotation" , authMiddleware.isLogin , custController.getAddQuotation)

router.post("/add-quotation" , authMiddleware.isLogin  ,addQuotationValidation  , custController.addQuotation)

router.get("/downlaod_quotation/:id" , authMiddleware.isLogin , custController.downloadQuotation)

router.get("/remove-quotation/:id" , authMiddleware.isLogin , custController.removeQuotation)

// Invoice
router.get("/myInvoice",  authMiddleware.isLogin , custController.getMyInvoice );

router.get("/add-invoice" , authMiddleware.isLogin  , custController.getAddInvoice)

router.post("/add-invoice" , authMiddleware.isLogin , addInvoiceValidation , custController.AddInvoice)

router.get("/downlaod_invoice/:id" , authMiddleware.isLogin , custController.downloadInvoice)

router.get("/remove-invoice/:id" , authMiddleware.isLogin , custController.removeInvoice)


// Money Receipt
router.get("/moneyReceipt" , authMiddleware.isLogin , custController.getMyReceipt)

router.get("/add-moneyReceipt" , authMiddleware.isLogin , custController.getAddMoneyReceipt)

router.post("/add-moneyReceipt" , authMiddleware.isLogin , custController.AddMoneyReceipt)

router.get("/downlaod_receipt/:id" , authMiddleware.isLogin , custController.downloadReceipt)

router.get("/remove-receipt/:id" , authMiddleware.isLogin , custController.removeReceipt)

// Logo

router.get("/generalSettings", authMiddleware.isLogin , custController.getGeneralSettings);

router.post("/add-generalSettings" , authMiddleware.isLogin , custController.addGeneralSettings)


// Bank Details 
router.get("/bankDetails" , authMiddleware.isLogin , custController.getBankDetails)


router.post("/add-bankDetails" , authMiddleware.isLogin , custController.bankDetails)

// router.get("/downlaod_receipt/:id" , authMiddleware.isLogin , custController.downloadReceipt)

// router.get("/remove-receipt/:id" , authMiddleware.isLogin , custController.removeReceipt)




module.exports = router;