//Handles JWT and authentication


const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { authUser, loginUser } = require('../../controllers/auth-controller');
const { check } = require('express-validator');



// @route     GET api/auth
// @desc      Test route
// @access    Public
router.get('/', auth, authUser)


// @route     POST api/auth
// @desc      Authenticate user and get token
// @access    Public
router.post('/', [
    check('email', 'Include valid email').isEmail(),    //Check if email is valid format
    check('password', 'Password is required').exists() //Check if password input is filled 
], loginUser);

module.exports = router;