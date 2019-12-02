const User = require('../models/user');
const JWT = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');



const authUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Check is user already exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
        }


        const isMatch = await bcrypt.compare(password, user.password); //Compare's plain text password and encrypted password
        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
        }


        const payload = {
            user: {
                id: user.id
            }
        }
        JWT.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            });



    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}


module.exports = { authUser, loginUser };