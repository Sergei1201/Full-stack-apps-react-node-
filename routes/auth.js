const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const { ResultWithContext } = require('express-validator/src/chain')
const User = require('../models/User')
const { findOne } = require('../models/User')
//@route GET api/auth
// @ddesc Get logged in user
// @access Private
router.get('/', (req, res) =>res.send('Get logged in user'))

//@route POST api/auth
// @ddesc Auth user and get token
// @access Public
router.post('/', [check('email', 'Please enter a valid email...').isEmail(),
                check('password', 'Password is required').exists() ], async (req, res) => {
                // Checking if there are any errors
                const errors = validationResult(req)
                if(!errors.isEmpty()) {
                    return res.status(400).json({errors: errors.array()})
                }
                // Destructuring the user (request)
                const {email, password} = req.body
                    
                try {

 // Finding a user and comparing him/her to the one in the database
 let user = await User.findOne({email})
 // If there are no match, throwing an error
 if(!user) {
     return res.status(400).json({msg: 'Invalid credentials'})
 }
 //Compare the password in the database to the one provided by the user who is trying to authenticate
 let isMatch = await bcrypt.compare(password, user.password)

 // If there's no match, error
 if(!isMatch) {
     return res.status(400).json({msg: 'Invalid credentials'})
 }
 // After successful authentication provide the user with a json web token
 const payload = {
     user: {
         id: user.id
     }
 }

 jwt.sign(payload, config.get('jwtSecret'), {
     expiresIn: 360000
 }, (err, token) => {
     if(err) throw err
     res.json({token})
 })

                } catch(err) {
                    if(err) {
                        console.error(err.message)
                        res.status(500).send('Server error')
                    }

                }
               
            


                }
            
                )
module.exports = router 
