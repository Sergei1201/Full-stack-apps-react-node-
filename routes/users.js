const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const { ResultWithContext } = require('express-validator/src/chain')
const User = require('../models/User')

//@route POST api/users
// @ddesc Registering a user
// @access Public
router.post('/', [check('name', 'Please enter your name').not().isEmpty(),
                  check('email', 'Please include a valid email').isEmail(),
                  check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})], async (req, res) => {
                      const errors = validationResult(req)
                      if(!errors.isEmpty()) {
                         return res.status(400).json({errors: errors.array()})
                      }
                     const {name, email, password} = req.body
                     try {
                         let user = await User.findOne({email})
                         if(user) {
                             return res.status(400).json({msg: 'User already exists...'})
                         }
                         user = new User({
                             name,
                             email,
                             password
                         })
                         // Hashing the password before adding the user into the database
                         // Generating salt for the password
                         const salt = await bcrypt.genSalt(10)

                         //Hashing the password
                         user.password = await bcrypt.hash(password, salt)
                         // Adding the user into the database
                         await user.save()

                         // Sending a response to the user saying that he has been saved in the database
                         res.send('The user has been saved...')
                     } catch (err) {
                         console.error(err.message)
                         res.status(500).send('Server error')
                         
                     }
                      
                  })
module.exports = router
