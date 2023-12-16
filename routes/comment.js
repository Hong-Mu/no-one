const express = require('express');
const router = express.Router();

const db = require('../models');

router.post('/', async (req, res) => {
    const { content, PostId } = req.body;

    console.log(req.params)
    const newComment = await db.Comment.create({
        content: content,
        UserId: req.session.user.id,
        PostId: PostId,
    });
    res.redirect(`/post/${PostId}`)
});

module.exports = router;