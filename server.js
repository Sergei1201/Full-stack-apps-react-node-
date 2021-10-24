// Creating a basic express server
const express = require('express')
const app = express()
// Adding a route
app.get('/', (req, res) => res.json({msg: 'Welcome to Contact Keeper API'}))
// Defining routes
app.use('/api/users', require('./routes/users'))
app.use('/api/contacts', require('./routes/contacts'))
app.use('/api/auth', require('./routes/auth'))
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`The server is running on the port ${PORT}`))