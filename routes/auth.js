const express = require('express')
const router = express.Router()
//@route GET api/auth
// @ddesc Get logged in user
// @access Private
router.get('/', (req, res) =>res.send('Get logged in user'))

//@route POST api/auth
// @ddesc Auth user and get token
// @access Public
router.post('/', (req, res) => res.send('Logged in user'))
module.exports = router
