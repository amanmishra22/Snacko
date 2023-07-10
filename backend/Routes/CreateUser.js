const express=require('express')
const router=express.Router()
const User=require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const jwtsecret="JaiShreeRamHarHarMahadevJaiHindBharatMataKiJay"
router.post("/createuser",[
body('email').isEmail(),
body('name').isLength({ min: 5 }),
  body('password','incorrect password').isLength({ min: 5 })],
async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt=await bcrypt.genSalt(10);
    let secPassword=await bcrypt.hash(req.body.password,salt);
    try {
        User.create({
            name:req.body.name,
            password:secPassword,
            email: req.body.email,
            location: req.body.location
        })
        res.json({success:true});
    } catch (error) {
        console.log(error)
        res.json({success:false});
    }
})

router.post("/loginuser",[
    body('email').isEmail(),
      body('password','incorrect password').isLength({ min: 5 })],
    async(req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        let email=req.body.email;
        try {
            let userdata=await User.findOne({email});
            if(!userdata){
                return res.status(400).json({errors:"Try again"})
            }
            const passwordcompare=await bcrypt.compare(req.body.password,userdata.password)
            if(!passwordcompare){
                return res.status(400).json({errors:"Try again"})
            }
            const data={
                user:{
                    id:userdata.id
                }
            }
            const authToken=jwt.sign(data,jwtsecret)
            return res.json({success:true,authToken:authToken})
        } catch (error) {
            console.log(error)
            res.json({success:false});
        }
    })
module.exports=router;