/*
** Author: Sylvain Garant
** Website: https://github.com/Xobtah
*/

let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let config = require('./../config');
let saltRounds = 10;

let UserSchema = mongoose.Schema({
    roles: [ String ],
    username: {
        type: String,
        unique: true,
        required: [ true, 'can\'t be blank' ],
        match: [ /^[a-zA-Z0-9]+$/, 'is invalid' ],
        index: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: [ true, 'can\'t be blank' ],
        match: [ /\S+@\S+\.\S+/, 'is invalid' ],
        index: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    links: [ mongoose.Schema.Types.ObjectId ],
    activities: [ mongoose.Schema.Types.ObjectId ],
    trainings: [ mongoose.Schema.Types.ObjectId ],
    bio: {
        type: String,
        default: ''
    },
    profilePic: {
        type: String,
        default: '/static/user_default.jpg'
    },
    coverPic: {
        type: String,
        default: '/static/cover_default.jpg'
    },
    sportsHall: mongoose.Schema.Types.ObjectId,
    goal: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

UserSchema.statics.getUserByUsername = function (username, callbalk) {
    return (this.model('User').findOne({ username: username }, callbalk));
};

UserSchema.methods.tryPassword = function (password, callback) {
    return (bcrypt.compare(password, this.password, callback));
}

UserSchema.methods.setPassword = function (password, callback) {
    if (password.length < 8) {
        if (callback)
            callback('Password must contain at least 8 characters');
        return ;
    }
    return (bcrypt.hash(password, config.saltRounds || saltRounds, (err, hash) => {
        if (err && callback)
            return (callback('Failed to hash password'));
        this.password = hash;
        if (callback)
            callback();
    }));
}

UserSchema.methods.updateEmail = function (email, callback) {
    this.email = email;
    this.save(callback);
}

UserSchema.pre('save', function (next) {
    let thirteenYearsAgo = new Date();

    thirteenYearsAgo.setFullYear(thirteenYearsAgo.getFullYear() - 13);
    if (this.birthDate > new Date())
        return (next('You can\'t be born in the future, Marty!'));
    if (this.birthDate > thirteenYearsAgo)
        return (next('You must be thirteen to use SportsFun'));
    if (this.username.length < 3)
        return (next('The username must be at least three characters long'));
    if (!this.links)
        this.links = [];
    next();
});

mongoose.model('User', UserSchema);
