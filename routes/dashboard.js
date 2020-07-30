const router = require('express').Router();
const verifyToken = require('./authToken');

router.get('/dashboard', verifyToken, (req,res) => {
    res.send('Welcome To Dashboard Page ');
     User.findOne(req.userExist);
    // res.send(req.userExist);
    // User.findOne({_id: req.userExist});
    // User.findOne({})
});

module.exports = router;