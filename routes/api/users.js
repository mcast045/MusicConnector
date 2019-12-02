const express = require('express');
const router = express.Router();
const createUser = require('../../controllers/user-controller');
const { check } = require('express-validator'); //Used to validate user input 


// @route     POST api/users
// @desc      Create user
// @access    Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),                                            //Check is field is filled out
    check('email', 'Include valid email').isEmail(),                                             //Check if email is valid format
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }) //Check is password has at least 6 characters 
], createUser);

module.exports = router;