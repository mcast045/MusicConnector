const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProfileSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    instruments: {
        type: [String],
        required: true
    },
    bands: [
        {
            name: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: String
            },
            current: {
                type: Boolean,
                default: false
            },
            genres: {
                type: [String]
            },
            description: {
                type: String
            },
        }
    ],
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        instagram: {
            type: String
        },
        spotify: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Profile = mongoose.model('profile', ProfileSchema);
module.exports = Profile