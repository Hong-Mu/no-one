const express = require('express');
const multer = require('multer');
const path = require('path')
const router = express.Router();

const db = require('../models');

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads/');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        }
    }),
});

router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { title, content, location, latitude, longitude } = req.body;
        console.log(req.body)
        console.log(req.file)
        const newPost = await db.Post.create({
            title: title,
            content: content,
            location: location,
            image: req.file.filename,
            lat: latitude,
            lng: longitude,
            UserId: req.session.user.id
        });
        console.log(newPost)
        res.redirect('/posts');
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error', error: err });
    }
});

router.get('/:id', (req, res) => {
    try {
        const id = req.params.id

        const post = Post.findOne({
            where: {
                id,
            }
        });

        if (!user) {
            res.status(401).json({ message: 'Unauthorized' });
        }

        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error', error: err });
    }
});

module.exports = router;


