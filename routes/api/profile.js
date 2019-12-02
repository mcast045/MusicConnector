const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check } = require('express-validator');
const { getOneProfile, getAllProfiles, getProfileById, createOrUpdateProfile, addBand, deleteProfile, deleteBand } = require('../../controllers/profile-controller');


// @route     GET api/profile/me
// @desc      Get a profile
// @access    Private
router.get('/me', auth, getOneProfile);

// @route     GET api/profile
// @desc      Get all profiles
// @access    Public
router.get('/', getAllProfiles)

// @route     GET api/profile/user/:user_id
// @desc      Get profile by userId
// @access    Public
router.get('/user/:user_id', getProfileById)


// @route     POST api/profile
// @desc      Create or Update user profile
// @access    Private
router.post('/', [auth, [
    check('instruments', 'Instruments is required').not().isEmpty(),
    check('status', 'Status is required').not().isEmpty()
]], createOrUpdateProfile)

// @route     PUT api/profile/band
// @desc      Update band to profile
// @access    Private
router.put('/band', [auth, [
    check('name', 'Name is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
]], addBand)


// @route     DELETE api/profile
// @desc      Delete profile, user, and posts
// @access    Private
router.delete('/', auth, deleteProfile)


// @route     DELETE api/profile/band/:band_id
// @desc      Delete band from profile
// @access    Private
router.delete('/band/:band_id', auth, deleteBand)


module.exports = router;