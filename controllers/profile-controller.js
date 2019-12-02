const Profile = require('../models/profile');
const User = require('../models/user');
const Post = require('../models/post');
const { validationResult } = require('express-validator');



const getOneProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']); // 'user' references the user object in '../models/profile'

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' })
        }

        res.json(profile);

    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}



const getAllProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);

    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}


const getProfileById = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({ msg: 'Profile not found' });
        }

        res.json(profile);

    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        return res.status(500).send('Server Error');
    }
}







const createOrUpdateProfile = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    };

    const {
        website,
        location,
        bio,
        status,
        instruments,
        youtube,
        facebook,
        twitter,
        instagram,
        spotify
    } = req.body;

    //Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (website) profileFields.website = website;
    if (instruments) {
        profileFields.instruments = instruments.split(',').map(instrument => instrument.trim());
    }

    //Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;
    if (spotify) profileFields.social.spotify = spotify;

    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if (profile) {
            //Update
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
            return res.json(profile);
        }

        //Create
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}




const addBand = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, from, to, current, genres, description } = req.body;
    const newBand = { name, from, to, current, description };
    if (genres) {
        newBand.genres = genres.split(',').map(genre => genre.trim());
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.bands.unshift(newBand);
        await profile.save();
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}




const deleteProfile = async (req, res) => {
    try {
        // Delete Profile
        await Profile.findOneAndRemove({ user: req.user.id })

        // Delete User
        await User.findOneAndRemove({ _id: req.user.id })

        // Delete User Posts
        await Post.deleteMany({ user: req.user.id })

        res.json({ msg: 'User deleted' })

    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' })
        }
        res.status(500).send('Server Error');
    }
}


const deleteBand = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })

        // Find index of bands to remove
        const removeBandIndex = await profile.bands.map(band => band.id).indexOf(req.params.band_id);
        profile.bands.splice(removeBandIndex, 1);

        await profile.save();
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

module.exports = { getOneProfile, getAllProfiles, getProfileById, createOrUpdateProfile, addBand, deleteProfile, deleteBand };
