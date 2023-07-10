const { where, Op } = require("sequelize");
const Customer = require("../models/Customer");
const Domains = require("../models/Domains");
const HostingProvider = require("../models/HostingProvider");
const bcrypt = require("bcrypt");
const Services = require("../models/Services");
const Hostings = require("../models/Hostings");
const Quotation = require("../models/Quotation");
const fs = require("fs");
const getPDF = require("../utils/getPDF");
const Invoice = require("../models/Invoice");
const {validationResult} = require("express-validator")

exports.getDashboard = async (req, res) => {
  const totalDomains = await Domains.count();
  const totalCust = await Customer.count({where : {roleId : 2 }});
//   const today = new Date();
// const nextMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);

// const domains = await Domains.findAll({
//   where: {
//     expire_date: {
//       [Op.gte]: today.toISOString().substring(0, 19).replace('T', ' '),
//       [Op.lte]: nextMonth.toISOString().substring(0, 19).replace('T', ' ')
//     }
//   },
//   include:[{
//     model : Customer
//   }]
// });

const today = new Date();
const thirtyDaysFromNow = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000));
const domains = await Domains.findAll({
  where: {
    expire_date: {
      [Op.lte]: thirtyDaysFromNow
    }
  },
    include:[{
      model : Customer
    }],
    order: [
      [ "expire_date" , 'ASC']
  ]
})

const expiredDomain = await Domains.count({where : {expire_date : {[Op.gte] : new Date()}}})

const hostings = await Hostings.findAll({
  where: {
    expire_date: {
      [Op.lte]: thirtyDaysFromNow
    }
  },
    include:[{
      model : Customer
    }],
    order: [
      [ "expire_date" , 'ASC']
  ]
})

// const hostings = await Hostings.findAll({
//   where: {
//     expire_date: {
//       [Op.gte]: today.toISOString().substring(0, 19).replace('T', ' '),
//       [Op.lte]: nextMonth.toISOString().substring(0, 19).replace('T', ' ')
//     }
//   },
//   include: [{
//     model: Customer
//   }]
// });

// res.send(domains)

  res.render("admin/dashboard", {
    path: "/admin/",
    totalDomains: totalDomains,
    totalCust: totalCust,
    domains : domains,
    hostings : hostings,
    expiredDomain : expiredDomain
  });
};

exports.getCustomer = (req, res) => {
  Customer.findAll().then((customers) => {
    res.render("admin/customer", { path: "/admin/customers", customers: customers });
  });
};

exports.getCustDetails = async (req, res) => {
  const cust = await Customer.findByPk(req.params.id);

  const services = await Services.findAll();

  if (cust) {
    res.render("admin/cust-details", {
      path: "/admin/cust_details",
      customer: cust,
      services: services,
    });
  }
};

exports.getAddCustomer = (req, res) => {
  res.render("admin/add-customer", { path: "admin/add-customer" , errors : null });
};

exports.AddCustomer = async (req, res) => {
  try {

    const errors= validationResult(req)
    
    if (!errors.isEmpty()) {
      console.log(errors.array());
     return  res.status(422).render("admin/add-customer", { path: "admin/add-customer" , errors : errors.array()[0].msg });
    }

    const cust_uniq_id = Math.random().toString(36).slice(2);
    const securePassword = await bcrypt.hash(req.body.password, 12);
    const newCust = await Customer.create({
      name: req.body.cust_name,
      cust_uni_id: cust_uniq_id,
      email: req.body.cust_email,
      phone_1: req.body.cust_phone_1,
      phone_2: req.body.cust_phone_2,
      phone_3: req.body.cust_phone_3,
      phone_4: req.body.cust_phone_4,
      comp_name: req.body.comp_name,
      address: req.body.address,
      city: req.body.city,
      pincode: req.body.pincode,
      password: securePassword,
    });

    if (newCust) {
      res.redirect("/admin/customers");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getEditCustomer = async (req, res) => {
  const customer = await Customer.findByPk(req.params.id);
  res.render("admin/edit-customer", {
    path: "/admin/edit-customer",
    customer: customer,
  });
};

exports.editCustomer = (req, res) => {
  Customer.findByPk(req.body.id)
    .then((cust) => {
      (cust.name = req.body.cust_name),
        (cust.email = req.body.cust_email),
        (cust.phone_1 = req.body.cust_phone_1),
        (cust.phone_2 = req.body.cust_phone_2),
        (cust.phone_3 = req.body.cust_phone_3),
        (cust.phone_4 = req.body.cust_phone_4),
        (cust.comp_name = req.body.comp_name),
        (cust.address = req.body.address),
        (cust.city = req.body.city),
        (cust.pincode = req.body.pincode);
      return cust.save();
    })
    .then((result) => {
      res.redirect("/admin/customers");
    });
};

exports.removeCust = async (req, res) => {
  try {
    const deleted = await Customer.destroy({ where: { id: req.params.id } });

    if (deleted) {
      res.redirect("/admin/customers");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.addService = async (req, res) => {
  try {
    const { cust_id, services } = req.body;

    if (services === "1") {
      return res.redirect("/admin/add-domain");
    }

    if (services === "2") {
      return res.redirect("/admin/add-hosting");
    }
  } catch (error) {
    console.log(error);
  }
};

// Domains Controllers

exports.getDomain = async (req, res) => {
  const domains = await Domains.findAll({
    include: [
      {
        model: Customer, // will create a left join
      },
    ],
  });

  // res.send(domains)
  res.render("admin/domains", { path: "/admin/domains", domains: domains });
};

exports.getAddDomain = async (req, res) => {
  try {
    const customers = await Customer.findAll({ where: { ban: 0 } });

    const providers = await HostingProvider.findAll();

    res.render("admin/add-domain", {
      path: "/admin/add-domain",
      customers: customers,
      providers: providers,
      errors : null
    });
  } catch (error) {
    console.log(error);
  }
};

exports.AddDomain = async (req, res) => {

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const customers = await Customer.findAll({ where: { ban: 0 } });

    const providers = await HostingProvider.findAll();

   return  res.status(422).render("admin/add-domain", {
    path: "/admin/add-domain",
    customers: customers,
    providers: providers,
    errors : errors.array()[0].msg ,
  })
  }

  // Domains.create({
  //   customerId: req.body.cust_name,
  //   status: req.body.status,
  //   domain_name: req.body.domain_name,
  //   booked_from: req.body.book_from,
  //   doamin_mailId: req.body.login_id,
  //   domain_password: req.body.password,
  //   domain_pin: req.body.pin,
  //   registration_Date: req.body.reg_date,
  //   expire_date: req.body.exp_date,
  //   remark: req.body.remark,
  //   domain_amount: req.body.renew_amt,
  //   hosting_provider: req.body.hosting_provider,
  // })
  //   .then((domain) => {
  //     res.redirect("/admin/domains");
  //     console.log(domain);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
};


exports.AddHosting = (req, res) => {
  Hostings.create({
    customerId: req.body.cust_name,
    status: req.body.status,
    hosting_name: req.body.hosting_name,
    booked_from: req.body.book_from,
    hosting_mailId: req.body.login_id,
    hosting_password: req.body.password,
    hosting_pin: req.body.pin,
    registration_Date: req.body.reg_date,
    expire_date: req.body.exp_date,
    remark: req.body.remark,
    hosting_amount: req.body.renew_amt,
    hosting_provider: req.body.hosting_provider,
  })
    .then((hosting) => {
      res.redirect("/admin/");
      console.log(hosting);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getAddHosting = async (req, res) => {
  try {
    const customers = await Customer.findAll({ where: { ban: 0 } });

    const providers = await HostingProvider.findAll();
    res.render("admin/add-hosting", {
      path: "add-hosting",
      customers: customers,
      providers: providers,
    });
  } catch (error) {
    console.log(error);
  }
};

// Hosting Provider Controllers

exports.getHostProviders = async (req, res) => {
  const providers = await HostingProvider.findAll();

  res.render("admin/hosting_providers", {
    path: "/admin/host-providers",
    providers: providers,
  });
};

// Services

exports.getServices = async (req, res) => {
  const services = await Services.findAll();

  res.render("admin/services", { path: "/admin/services", services: services });
};

exports.addServices = async (req, res) => {
  try {
    const newService = await Services.create({
      service_name: req.body.service_name,
    });

    if (newService) {
      res.redirect("/admin/services");
    }
  } catch (error) {
    console.log(error);
  }
};



// All Quotations 

exports.getAllQuotations = async (req, res) => {
  const allQuotations = await Quotation.findAll();

  res.render("admin/quotations" , {path : "admin/quotation" , allQuotations : allQuotations})
}


exports.downloadQuotation = async (req, res) => {
  try {
    const id = req.params.id;
    const quotation_details = await Quotation.findByPk(id);
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
        tableHeadColor: quotation_details.quotation_color,
        client_name: quotation_details.client_name,
        createdAt: quotation_details.createdAt,
        client_mobile: quotation_details.client_mobile,
        shift_from: quotation_details.shift_from,
        shift_to: quotation_details.shift_to,
        shifting_date: quotation_details.shifting_date,
        token_amt: quotation_details.token_amt,
        totalCost: tatalCost,
      };
      await getPDF.generatePDF(res, template, data , id);
      return;
    }

    res.redirect("/admin/quotation");
  } catch (error) {
    console.log(error);
  }
};

exports.removeQuotation = async (req, res) => {
  try {
    const id = req.params.id;
  
    const quotationDestroyed = await Quotation.destroy({where:{id : id}})
  
    res.redirect("/admin/quotation");
  } catch (error) {
    console.log(error);
  }
  
  };



  // Invoices

  exports.getAllInvoice = async (req , res )=>{
    const invoices = await Invoice.findAll();
    res.render("admin/invoice", {
      path: "admin/myInvoice",
      invoices : invoices,
    });
  }
  
  
  exports.downloadInvoice = async (req, res) => {
    try {
      const id = req.params.id;
      const invoice_details = await Invoice.findByPk(id);
      if (id) {
        const template = fs.readFileSync("views/pdf/invoice.ejs", "utf-8");
        const tatalCost =
          Number(invoice_details.packing_charges) +
          Number(invoice_details.loading_charges) +
          Number(invoice_details.unloading_charges) +
          Number(invoice_details.unpacking_charges);
        const data = {
          packing_charges: invoice_details.packing_charges,
          loading_charges: invoice_details.loading_charges,
          unloading_charges: invoice_details.unloading_charges,
          unpacking_charges: invoice_details.unpacking_charges,
          tableHeadColor: invoice_details.quotation_color,
          client_name: invoice_details.client_name,
          createdAt: invoice_details.createdAt,
          client_mobile: invoice_details.client_mobile,
          shift_from: invoice_details.shift_from,
          shift_to: invoice_details.shift_to,
          shifting_date: invoice_details.shifting_date,
          token_amt: invoice_details.token_amt,
          totalCost: tatalCost,
        };
        await getPDF.generatePDF(res, template, data , id);
        return;
      }
  
      res.redirect("/admin/invoice");
    } catch (error) {
      console.log(error);
    }
  };


  exports.removeInvoice = async (req, res) => {
    try {
      const id = req.params.id;
    
      const invoiceDestroyed = await Invoice.destroy({where:{id : id}})
    
      res.redirect("/admin/invoice");
    } catch (error) {
      console.log(error);
    }
    
    };