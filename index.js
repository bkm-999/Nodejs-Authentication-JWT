const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//Import Route
const authRoute = require('./routes/auth');
//Import dashboard route
const dashRoute = require('./routes/dashboard');
//Call dotenv
dotenv.config();
//Connect to DB
mongoose.connect(process.env.DB_CONNECT, 
    { useNewUrlParser: true,  useUnifiedTopology: true }, () => {
    console.log('MongoDB connected Successfully!!!');
});
//Middleware
app.use(express.json());
//Route middleware as a prefix before any route
app.use('/api/user', authRoute);
//Route to Dashboard
app.use('/api/user/access', dashRoute);
//Assign port number 
const port = process.env.PORT || 7000;
app.listen(port, () => console.log(`App working well on port ${port}`));