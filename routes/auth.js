const { DataTypes } = require('sequelize');
const { sequelize } = require('../models');

const express = require('express');
const router = express.Router();


const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

router.post('/register', (req, res) => {
    try {
        const { email, username, password } = req.body;

        const newUser = User.create({
            email,
            username,
            password,
        });

        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error', error: err });
    }
});

router.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;

        const user = User.findOne({
            where: {
                email,
                password,
            }
        });

        if (!user) {
            res.status(401).json({ message: 'Unauthorized' });
        }

        req.session.user = user;
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error', error: err });
    }
});

router.get('/logout', (req, res) => {
    res.send('logout');
});

module.exports = router;


