const express = require("express");
const router = express.Router();
const {ensureAuthenticated} = require("../config/auth.js")

router.get("/",(req,res)=>{
    res.render("welcome.ejs");
})
router.get("/dashboard",ensureAuthenticated,(req,res)=>{
    res.render("dashboard.ejs",{
        id : req.user._id,
        name : req.user.name,
        email: req.user.email
    });
})

module.exports = router;
