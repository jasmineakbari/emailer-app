const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const emailSchema = require('./Email');

const GroupSchema = new Schema(
    {
        group_name: {
            type: String,
            required: true
        },
        savedEmails: {emailSchema},
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtval => dateFormat(createdAtval)
        },
        username: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
    }
);

const Group = model('Group', GroupSchema);

module.exports = Group;