const express = require("express");
const path = require("path");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose")
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport")

//passport config
require("./config/passport.js")(passport);

//EJS
app.use(expressLayouts);
app.set("view engine","ejs");

//set public
app.use(express.static(path.join(__dirname, 'public')));

//set bodyParser
app.use(express.urlencoded({extended:false}));

//Expresss Session
app.use(session({
  secret : "secret",
  resave : true,
  saveUninitialized : true
}))

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash())

//global vars
app.use((req,res,next)=>{
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
})

//DB Config
const db = require("./config/keys").mongoURI;

//connect to Mongo
mongoose
  .connect(
    db,
    { useNewUrlParser: true,useUnifiedTopology:true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));



///////////Router////////
const index = require("./routes/index"); 
const users = require("./routes/users"); 
///////Use Router////////
app.use("/",index);
app.use("/users",users);
////////////////////////


app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
})