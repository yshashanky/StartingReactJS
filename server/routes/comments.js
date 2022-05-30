const express = require('express')
const router = express.Router()
const { comments } = require('../models')
const { validateToken } = require('../middlewares/AuthMiddleware')

router.get('/:postId', async (req, res) => {
    const postId = req.params.postId;
    const userComments = await comments.findAll({ where: { PostId: postId}});
    res.json(userComments)
});

router.post('/', validateToken, async (req, res) => {
    const userComment = req.body;
    const username = req.user.username;
    userComment.username = username;
    await comments.create(userComment);
    res.json(userComment);
});

module.exports = router 
