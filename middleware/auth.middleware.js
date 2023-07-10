const Customer = require("../models/Customer");

exports.isAdmin = async (req, res, next) => {
  if (!req.session.custId) {
    return res.redirect("/");
  }

  const admin = await Customer.findByPk(req.session.custId);
  if (admin.roleId != 1) {
    // check if user is not admin
    return res.redirect("/");
  }

    res.locals.isAdmin = true;

  next();
  //   const cust = await Customer.findOne({ where: { id: req.session.custId } });

  //   if (cust.roleId !== 1) {
  //     return res.redirect("/");
  //   }

  //   console.log("====================================");
  //   console.log(cust);
  //   console.log("====================================");
  //   next();
  // };

  // exports.isCust = async (req, res, next) => {
  //   const cust = await Customer.findOne({ where: { id: req.session.custId } });

  //   if (cust.roleId !== 2) {
  //     return res.redirect("/");
  //   }

  //   console.log("====================================");
  //   console.log(cust);
  //   console.log("====================================");
  // next();
};

exports.isLogin = (req, res, next) => {
  if (req.session && req.session.custId) {
    res.locals.isAdmin = false;
    next();
  } else {
    res.redirect("/");
  }
};


exports.isLogedIn = async (req, res, next) => {

  if (req.session && req.session.custId) {
    const admin = await Customer.findByPk(req.session.custId);
   if(admin.roleId == 1){
    return res.redirect("/admin/")
   
   }

   if(admin.roleId == 2){
     return res.redirect("/customer/")
   }
   
  } else {
     next();
  }
};