const Quotation = require("../models/Quotation");
const fs = require("fs");
const Invoice = require("../models/Invoice");
const getPDF = require("../utils/getPDF");
const MoneyReceipt = require("../models/MoneyReceipt");
const puppeteer = require("puppeteer");
const ejs = require("ejs");
const BankDetails = require("../models/BankDetails");
const GeneralSetting = require("../models/GeneralSetting");
const { validationResult } = require("express-validator");
const Domains = require("../models/Domains");
const { Op } = require("sequelize");

exports.getDashboard = async (req, res) => {

  const domain = await Domains.count({
    where: { customerId: req.session.custId },
  });
  const quotation = await Quotation.count({
    where: { customerId: req.session.custId },
  });
const invoice = await Invoice.count({
  where: { customerId: req.session.custId },
});

const expiredDomain = await Domains.count({where : {customerId : req.session.custId  , expire_date : {[Op.gte] : new Date()}}})


  res.render("customer/dashboard", { path: "/customer/" , domain , quotation , invoice ,     expiredDomain});
};

exports.getMyQuotations = async (req, res) => {
  const quotations = await Quotation.findAll({
    where: { customerId: req.session.custId },
  });
  res.render("customer/quotation", {
    path: "customer/myQuotations",
    quotations,
  });
};

exports.getAddQuotation = (req, res) => {
  res.render("customer/add-quotation", { path: "customer/add-quotation", errors: null });
};

exports.addQuotation = async (req, res) => {
  // res.send(req.body)
  try {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(422).render("customer/add-quotation", { path: "customer/add-quotation", errors: errors.array()[0].msg });
    }

    const createdQuotation = await req.cust.createQuotation({
      client_name: req.body.client_name,
      client_mobile: req.body.client_mobile,
      shift_from: req.body.shift_from,
      shift_to: req.body.shift_to,
      transport_charge: req.body.transport_charge,
      transport_type: req.body.transport_type,
      packing_charges: req.body.packing_charges,
      unpacking_charges: req.body.unpacking_charges,
      loading_charges: req.body.loading_charges,
      unloading_charges: req.body.unloading_charges,
      car_charge: req.body.car_charge,
      warehouse_charges: req.body.warehouse_charges,
      st_charges: req.body.st_charges,
      mathadi_charges: req.body.mathadi_charges,
      insurance_per: req.body.insurance_per,
      Insurance_type: req.body.Insurance_type,
      gst_per: req.body.gst_per,
      gst_type: req.body.gst_type,
      gst_num: req.body.gst_num,
      shifting_date: req.body.shifting_date,
      token_amt: req.body.token_amt,
      service_charge: req.body.service_charge,
      service_charge_type: req.body.service_charge_type
    });

    if (createdQuotation) {
      res.redirect("/customer/myQuotations");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.downloadQuotation = async (req, res) => {
  try {
    const id = req.params.id;
    const quotation_details = await Quotation.findByPk(id);
    const settings = await GeneralSetting.findOne({
      where: { customerId: req.session.custId },
    });
    const logoPath = settings.logoPath;
    if (id) {
      const template = fs.readFileSync("views/pdf/quotation.ejs", "utf-8");
      const tatalCost =
        Number(quotation_details.packing_charges) +
        Number(quotation_details.loading_charges) +
        Number(quotation_details.unloading_charges) +
        Number(quotation_details.unpacking_charges);
      const data = {
        packing_charges: quotation_details.packing_charges,
        loading_charges: quotation_details.loading_charges,
        unloading_charges: quotation_details.unloading_charges,
        unpacking_charges: quotation_details.unpacking_charges,
        tableHeadColor: settings.color,
        client_name: quotation_details.client_name,
        createdAt: quotation_details.createdAt,
        client_mobile: quotation_details.client_mobile,
        shift_from: quotation_details.shift_from,
        shift_to: quotation_details.shift_to,
        shifting_date: quotation_details.shifting_date,
        token_amt: quotation_details.token_amt,
        logo: `${req.protocol}://${req.headers.host}/${logoPath}`,
        totalCost: tatalCost,
      };
      await getPDF.generatePDF(res, template, data, id);
      return;
    }

    res.redirect("/customer/myQuotations");
  } catch (error) {
    console.log(error);
  }
};

exports.removeQuotation = async (req, res) => {
  try {
    const id = req.params.id;

    const quotationDestroyed = await Quotation.destroy({ where: { id: id } });

    res.redirect("/customer/myQuotations");
  } catch (error) {
    console.log(error);
  }
};

// Invoice

exports.getMyInvoice = async (req, res) => {
  const invoices = await Invoice.findAll({
    where: { customerId: req.session.custId },
  });
  res.render("customer/invoice", {
    path: "customer/myInvoice",
    invoices: invoices,
  });
};

exports.getAddInvoice = async (req, res) => {
  res.render("customer/add-invoice", { path: "customer/add-invoice", errors: null });
};

exports.AddInvoice = async (req, res) => {
  // res.send(req.body)
  try {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(422).render("customer/add-invoice", { path: "customer/add-invoice", errors: errors.array()[0].msg });
    }


    const createdInvoice = await req.cust.createInvoice({
      client_name: req.body.client_name,
      client_mobile: req.body.client_mobile,
      shift_from: req.body.shift_from,
      shift_to: req.body.shift_to,
      transport_charge: req.body.transport_charge,
      transport_type: req.body.transport_type,
      packing_charges: req.body.packing_charges,
      unpacking_charges: req.body.unpacking_charges,
      loading_charges: req.body.loading_charges,
      unloading_charges: req.body.unloading_charges,
      car_charge: req.body.car_charge,
      warehouse_charges: req.body.warehouse_charges,
      st_charges: req.body.st_charges,
      mathadi_charges: req.body.mathadi_charges,
      insurance_per: req.body.insurance_per,
      Insurance_type: req.body.Insurance_type,
      shifting_date: req.body.shifting_date,
      token_amt: req.body.token_amt,
      service_charge: req.body.service_charge,
      service_charge_type: req.body.service_charge_type,
      cgst_per: req.body.cgst_per,
      cgst_num: req.body.cgst_num,
      sgst_per: req.body.sgst_per,
      sgst_num: req.body.sgst_num,
    });

    if (createdInvoice) {
      res.redirect("/customer/myInvoice");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.downloadInvoice = async (req, res) => {
  try {
    const id = req.params.id;
    const invoice_details = await Invoice.findByPk(id);
    const settings = await GeneralSetting.findOne({
      where: { customerId: req.session.custId },
    });
    const logoPath = settings.logoPath;
    const bankDetails = await BankDetails.findOne({ where: { customerId: req.session.custId } })
    if (id) {
      const template = fs.readFileSync("views/pdf/invoice2.ejs", "utf-8");
      const tatalCost =
        Number(invoice_details.packing_charges) +
        Number(invoice_details.loading_charges) +
        Number(invoice_details.unloading_charges) +
        Number(invoice_details.unpacking_charges);
      const data = {
        client_name: invoice_details.client_name,
        packing_charges: invoice_details.packing_charges,
        loading_charges: invoice_details.loading_charges,
        unloading_charges: invoice_details.unloading_charges,
        unpacking_charges: invoice_details.unpacking_charges,
        tableHeadColor: settings.color,
        createdAt: invoice_details.createdAt,
        client_mobile: invoice_details.client_mobile,
        shift_from: invoice_details.shift_from,
        shift_to: invoice_details.shift_to,
        shifting_date: invoice_details.shifting_date,
        token_amt: invoice_details.token_amt,
        createdAt: invoice_details.createdAt,
        warehouse_charges: invoice_details.warehouse_charges,
        st_charges: invoice_details.st_charges,
        mathadi_charges: invoice_details.mathadi_charges,
        sgst_per: invoice_details.sgst_per,
        cgst_per: invoice_details.cgst_per,
        totalCost: tatalCost,
        logo: `${req.protocol}://${req.headers.host}/${logoPath}`,
        bankDetails: bankDetails
      };
      await getPDF.generatePDF(res, template, data, id);
      return;
    }

    res.redirect("/customer/myInvoice");
  } catch (error) {
    console.log(error);
  }
};

exports.removeInvoice = async (req, res) => {
  try {
    const id = req.params.id;

    const invoiceDestroyed = await Invoice.destroy({ where: { id: id } });

    res.redirect("/customer/myInvoice");
  } catch (error) {
    console.log(error);
  }
};

// Money Receipt

exports.getMyReceipt = async (req, res) => {
  const moneyReceipt = await MoneyReceipt.findAll({
    where: { customerId: req.session.custId },
  });
  res.render("customer/moneyReceipt", {
    path: "customer/moneyReceipt",
    moneyReceipt: moneyReceipt,
  });
};

exports.getAddMoneyReceipt = async (req, res) => {
  res.render("customer/add-moneyReceipt", {
    path: "customer/add-moneyReceipt",
  });
};

exports.AddMoneyReceipt = async (req, res) => {
  // res.send(req.body)
  try {
    const createdMoneyReceipt = await req.cust.createMoneyReceipt({
      client_name: req.body.client_name,
      client_mobile: req.body.client_mobile,
      shift_from: req.body.shift_from,
      shift_to: req.body.shift_to,
      rsInWords: req.body.priceInWords,
      shifting_date: req.body.shifting_date,
      total: req.body.total,
      advance: req.body.advance,
      balance: req.body.balance,
    });

    if (createdMoneyReceipt) {
      res.redirect("/customer/moneyReceipt");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.downloadReceipt = async (req, res) => {
  try {
    const id = req.params.id;

    const generatePDF = async (res, template, data, pdfName) => {
      const compiledTemplate = ejs.render(template, data);

      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setViewport({ width: 2000, height: 600 });
      await page.setContent(compiledTemplate);
      // await page.setDefaultNavigationTimeout(60000);

      const pdf = await page.pdf({
        format: "A4",
        printBackground: true,
        landscape: true,
      });
      await page.waitForSelector("img");
      await browser.close();

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${pdfName}.pdf`
      );
      res.send(pdf);
    };

    const receipt = await MoneyReceipt.findByPk(id);
    const logo = await GeneralSetting.findOne({
      where: { customerId: req.session.custId },
    });
    const logoPath = logo.logoPath;
    if (id) {
      const template = fs.readFileSync("views/pdf/money-receipt.ejs", "utf-8");
      const data = {
        client_name: receipt.client_name,
        createdAt: receipt.createdAt,
        client_mobile: receipt.client_mobile,
        shift_from: receipt.shift_from,
        shift_to: receipt.shift_to,
        shifting_date: receipt.shifting_date,
        priceInWords: receipt.rsInWords,
        total: receipt.total,
        advance: receipt.advance,
        balance: receipt.balance,
        logo: `${req.protocol}://${req.headers.host}/${logoPath}`,
      };
      await generatePDF(res, template, data, id);
      return;
    }

    res.redirect("/customer/moneyReceipt");
  } catch (error) {
    console.log(error);
  }
};

exports.removeReceipt = async (req, res) => {
  try {
    const id = req.params.id;

    const receiptDestroyed = await MoneyReceipt.destroy({ where: { id: id } });

    res.redirect("/customer/moneyReceipt");
  } catch (error) {
    console.log(error);
  }
};

// Logo

exports.getGeneralSettings = async (req, res) => {
  const settings = await GeneralSetting.findOne({
    where: { customerId: req.session.custId },
  });
  if (!settings) {
    return res.render("customer/generalSettings", {
      path: "customer/logo",
      logo: "img/dummyLogo.png",
      color: "#000000"
    });
  }
  res.render("customer/generalSettings", { path: "customer/generalSettings", logo: settings.logoPath, color: settings.color });
};

exports.addGeneralSettings = async (req, res) => {
  // res.send(req.body);
  const settings = await GeneralSetting.findOne({
    where: { customerId: req.session.custId },
  });


  try {
    const path = req.file?.path;
    const color = req.body.color;

    if (settings) {

      if (path) {
        const logoUpdated = await settings.update({
          logoPath: path,
        });
        if (logoUpdated) {
          return res.redirect("/customer/generalSettings");
        }
      }

      if (color !== '#000000') {
        const colorUpdated = await settings.update({
          color: color
        });
        if (colorUpdated) {
          return res.redirect("/customer/generalSettings");
        }
      }
    }

    const SettingsUploaded = await req.cust.createGeneralSetting({
      logoPath: path,
      color: color
    });

    if (SettingsUploaded) {
      res.redirect("/customer/generalSettings");
    }
  } catch (error) {
    console.log(error);
  }
};

// Bank Details

exports.getBankDetails = async (req, res) => {

  const bankDetails = await BankDetails.findOne({ where: { customerId: req.session.custId } })

  res.render("customer/bankDetails", { path: "customer/bankDetails", bankDetails: bankDetails });
};

exports.bankDetails = async (req, res) => {
  const bankDetails = await BankDetails.findOne({
    where: { customerId: req.session.custId },
  });

  try {
    if (bankDetails) {
      const bankDetailsUpdated = await BankDetails.update({
        bankName: req.body.bankName,
        accNum: req.body.accNum,
        ifsc: req.body.ifsc,
        paytm: req.body.paytm,
        gPay: req.body.gPay,
        phonePay: req.body.phonePay,
      });

      if (bankDetailsUpdated) {
        return res.redirect("/customer/bankDetails");
      }
    }

    const bankDetailsAdded = await BankDetails.create({
      customerId: req.session.custId,
      bankName: req.body.bankName,
      accNum: req.body.accNum,
      ifsc: req.body.ifsc,
      paytm: req.body.paytm,
      gPay: req.body.gPay,
      phonePay: req.body.phonePay,
    });

    if (bankDetailsAdded) {
      res.redirect("/customer/bankDetails");
    }
  } catch (error) {
    console.log(error);
  }
};
