/*
** Author: Sylvain Garant
** Website: https://github.com/Xobtah
*/

let mongoose = require('mongoose');

let ActivitySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    type: {
        type: String,
        default: 'sport'
    },
    timeSpent: Number,
    date: {
        type: Date,
        default: new Date()
    },
    goal: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

mongoose.model('Activity', ActivitySchema);