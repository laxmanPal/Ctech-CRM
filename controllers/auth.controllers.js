const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const Customer = require("../models/Customer");

exports.getLogin = (req, res) => {
  res.render("auth/login" , {errors : null});
};

exports.login = async (req, res) => {
  const { email, password } = req.body;



  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("auth/login" , {errors: errors.array()[0].msg });
  }

  const cust = await Customer.findOne({ where: { email: email } });

  const depass = await bcrypt.compare(password, cust.password);

  if (cust) {
    if (cust.roleId == 1) {
      if (depass) {
        req.session.role = 'admin';
        req.session.custId = cust.id;
        return res.redirect("/admin/");
      }
    }
    if (cust.roleId == 2) {
      if (depass) {
        req.session.custId = cust.id;
        return res.redirect("/customer/");
      }
    }
  }

  res.status(401).render("auth/login" , {errors: 'Invalid username or password'});
};

exports.getLogout = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return console.log(error);
    }
    return res.redirect("/");
  });
};
