const express = require("express");
const path = require("path");
const Customer = require("./models/Customer");
const Domains = require("./models/Domains");
const HostingProvider = require("./models/HostingProvider")
const Services = require("./models/Services")
const Hostings = require("./models/Hostings")
const sequelize = require("./utils/database");
const bodyParser = require("body-parser");
const Quotation = require("./models/Quotation")
const session = require('express-session');
const Invoice = require("./models/Invoice");
const MoneyReceipt = require("./models/MoneyReceipt");
const BankDetails = require("./models/BankDetails");
const multer = require("multer");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const GeneralSetting = require("./models/GeneralSetting");
const helmet = require("helmet");
const compression = require("compression")


const app = express();

const store = new SequelizeStore({
  db: sequelize,
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'tmp')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9)+ file.originalname)
  }
})

const upload = multer({ storage: storage })

// Global Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
  secret : process.env.SESSION_SECRET,
  store : store,
  resave : false,
  saveUninitialized : true,
}))
app.use(multer({ storage: storage }).single("logo"))
app.use(helmet())
app.use(compression())

// Static & EJS Stuff
app.use(express.static(path.join(__dirname , "public")))
app.use( "/tmp" , express.static(path.join(__dirname , "tmp")))
app.set("view engine" , "ejs");
app.set("views" , "views")

app.use((req, res, next) => {
  Customer.findByPk(req.session.custId)
    .then(cust => {
      req.cust = cust;
      custName = cust ? cust.name : 'Name'
      next();
    })
    .catch(err => console.log(err));
});


// Routes
app.use("/admin" , require("./routes/admin.routes"))
app.use(require("./routes/auth.routes"));
app.use("/customer" , require("./routes/customer.routes"))
app.use((req , res)=>{
    res.render("auth/404" , {path : '404'})
})

const port = process.env.PORT || 5000;

// Relations
Customer.hasMany(Domains);
Domains.belongsTo(Customer);
Customer.hasMany(Hostings);
Hostings.belongsTo(Customer);
Customer.hasMany(Quotation);
Quotation.belongsTo(Customer);
Customer.hasMany(Invoice);
Invoice.belongsTo(Customer);
Customer.hasMany(MoneyReceipt);
MoneyReceipt.belongsTo(Customer);
Customer.hasMany(GeneralSetting);
GeneralSetting.belongsTo(Customer);
Customer.hasMany(BankDetails);
BankDetails.belongsTo(Customer);

// Sequelize Sync
sequelize
  .sync()
  .then((result) => {
    console.log("💻 DB Connected");
  app.listen(port, () => {
    console.log("====================================");
    console.log(`Server running on port ${port} 🔥`);
    console.log("====================================");
  });
  })
  .catch((error) => {
    console.log("Error syncing table:", error);
  });

