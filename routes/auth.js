const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registValidation, loginValidation } = require('../validation/validation');



router.post('/register', async (req, res) => {

    //Validation process before register data
    
    // const validation = Joi.validate(req.body, schema);
    // res.send(validation);
    // const { error } = Joi.validate(req.body, schema);

    const { error } = registValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // res.send(error.details[0].message);
    // res.send('WOW register.');

    //Check for an existing user in DB based on email parameter
    const userExist = await User.findOne({
        email: req.body.email
    });
    if (userExist) return res.status(400).send('User Already Exist!!!');

    //Encrypt the password on DB
    const salt = await bcrypt.genSalt(10);
    const ncryptPassword = await bcrypt.hash(req.body.password, salt);
    //Creating new user
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: ncryptPassword
    });
    //save the new user info on DB
    try {
        const savedUser = await newUser.save();
        //Send back all user info
        // res.send(savedUser);

        //Chosen id for returning back of new user's confirmation
        res.send({ newUser: newUser._id });
    } catch{
        res.status(400).send(err);
    }
});

//Login
router.post('/login', async (req, res) => {
    //Login Validation
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //Making sure for user existence
    const userExist = await User.findOne({
        email: req.body.email
    });
    if (!userExist) return res.status(400).send('User not Exist!!!');
    //Password Comparison with exist one in DB
    const validPassword = await bcrypt.compare(req.body.password, userExist.password);
    if (!validPassword) return res.status(400).send('OPPS Invalid Password!!!');

    //making a new token and assign it after log in to the user
    const newToken = jwt.sign({ _id: userExist._id }, process.env.APP_TOKEN_CONFIG);
    res.header('givenToken', newToken).send(newToken);

    // res.send('Logged In Successfully :)');

});

module.exports = router;