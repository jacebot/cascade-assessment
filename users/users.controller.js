const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const userEvent = require('../_helpers/userEventLogger')

const Event = require('../events/user')

// routes
router.post('/login', login);
router.get('/', getUser);

module.exports = router;

function login(req, res, next) {
    userService.login(req.body)
        .then(user => {
            if (user) {
                res.json(user) 
                Event.login(user.id)
            } else {
                res.status(400).json({ message: 'Username or password is incorrect' })
                Event.failed(user.id)
            }
        })
        .catch(err => {
            next(err)
            Event.failed()
        });
}

function getUser(req, res, next) {
    userService.getUser()
        .then(users => res.json(users))
        .catch(err => next(err));
}
