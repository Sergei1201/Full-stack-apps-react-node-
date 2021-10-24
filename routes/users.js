const express = require('express')
const router = express.Router()
//@route POST api/users
// @ddesc Registering a user
// @access Public
router.post('/', (req, res) => res.send('Register a user'))
module.exports = router
