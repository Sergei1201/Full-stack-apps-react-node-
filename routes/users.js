const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const { ResultWithContext } = require('express-validator/src/chain')
const User = require('../models/User')

//@route POST api/users
// @ddesc Registering a user
// @access Public
router.post('/', [check('name', 'Please enter your name').not().isEmpty(),
                  check('email', 'Please include a valid email').isEmail(),
                  check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})], (req, res) => {
                      const errors = validationResult(req)
                      if(!errors.isEmpty()) {
                         return res.status(400).json({errors: errors.array()})
                      }
                      res.send('Passed')
                      
                  })
module.exports = router
