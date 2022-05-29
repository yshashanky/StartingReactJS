const express = require('express')
const router = express.Router()
const { comments } = require('../models')

router.get('/:postId', async (req, res) => {
    const postId = req.params.postId;
    const userComments = await comments.findAll({ where: { PostId: postId}});
    res.json(userComments)
});

module.exports = router 
