const User = require('../models/user');
const { validationResult } = require('express-validator'); // Used to validate user input 
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const JWT = require('jsonwebtoken');
const config = require('config');


const createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        // Check is user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] })
        }



        // Get user gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });
        user = new User({
            name,
            email,
            password,
            avatar
        });



        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();


        // Return JWT
        const payload = { // User Id is used as payload in JWT so user can quickly be identified with a token
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

module.exports = createUser;