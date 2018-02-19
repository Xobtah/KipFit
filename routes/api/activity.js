/*
** Author: Sylvain Garant
** Website: https://github.com/Xobtah
*/

let router = require('express').Router();
let Activity = require('mongoose').model('Activity');
let mid = require('./../middlewares');

router.get('/', mid.token, (req, res) => {
    Activity.find({ user: req.token._id }, (err, activities) => {
        if (err)
            return (res.status(500).send({ success: false, message: err }));
        res.status(200).send({ success: false, message: 'OK', data: activities });
    });
});

router.post('/create', mid.token, mid.fields([ 'game', 'type', 'timeSpent' ]), (req, res) => {
    let activity = new Activity();
    for (key in req.fields)
        activity[key] = req.fields[key];
    activity.save((err) => {
        if (err)
            return (res.status(500).send({ success: false, message: err }));
        res.status(200).send({ success: true, message: 'Activity saved' });
    });
});

module.exports = router;
