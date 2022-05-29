const express = require('express')
const router = express.Router()
const { comments } = require('../models')

router.get('/:postId', async (req, res) => {
    const postId = req.params.postId;
    const userComments = await comments.findAll({ where: { PostId: postId}});
    res.json(userComments)
});

router.post('/', async (req, res) => {
    const userComment = req.body;
    await comments.create(userComment);
    res.json(post);
});

module.exports = router 