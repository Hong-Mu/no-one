const express = require('express');
const router = express.Router();

const db = require('../models');

router.post('/register', (req, res) => {
    try {
        const { email, username, password } = req.body;

        const newUser = db.User.create({
            email,
            username,
            password,
        });

        res.redirect('/login');
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error', error: err });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await db.User.findOne({ where: { email, password, } });

        if (user) {
            req.session.user = {
                id: user.id,
                email: user.email,
                name: user.username,
            };

            req.session.save(err => {
                if (err) console.log(err);
                res.redirect('/')
            })

        } else {
            res.render('login', { message: 'Invalid email or password' });
        }

    } catch (err) {
        console.log(err);
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;


