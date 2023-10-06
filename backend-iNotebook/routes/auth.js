const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');
let success = false;

// ROUTE 1
// Creating authentication endpoint and putting checks
router.post('/createuser', [
    body('email', 'Enter a valid Email').isEmail(),
    body('name', 'Name cannot be blank').exists(),
    body('password', 'Passoword must be at least 5 characters').isLength({min: 5})
], async (req, res)=>{

    // Returning bad requests with errors
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array()});
    }

    try {
        
        // Check whether a user with this email exist already
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({success, error: "A user with this email already exists"})
        }
        
        // Hashing and securing password using the external module
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        console.log(secPass);
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email:req.body.email
        })

        // Signing token and using JWT to log in user
        const data = {
            user:{
                id: user.id
            }
        }
        const token = jwt.sign(data, 'shhhhh');
        success = true;
        res.json({success, token})

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal server Error');
    }
})

// ROUTE 2
// Creating login endpoint

router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Passoword must be at least 5 characters').isLength({min: 5})
], async (req, res)=>{

    // Returning bad requests with errors
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    try {
        
        // Checking if the user enters correct credentials
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success, error: "Please enter valid credentials"});
        }

        // Comparing password entered by user and one stored in database
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({success, error: "Please enter valid credentials"});
        }

        // If the password is correct the signing the data and sending auth token
        const data = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, 'shhhhh');
        success = true;
        res.json({success, token})

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal server Error');
    }

})

// ROUTE 3 - Getting logged in user's details, Login required
router.post('/getuser', fetchUser, async (req, res)=>{

    try {

        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal server Error');
    }

})

module.exports = router;