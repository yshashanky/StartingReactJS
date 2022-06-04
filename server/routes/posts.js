const express = require('express');
const router = express.Router();
const { posts, likes } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');

router.get('/', async (req, res) => {
    const listOfPosts = await posts.findAll({include: [likes] });
    res.json(listOfPosts)
});

router.get('/byId/:id', async (req, res) => {
    const id = req.params.id;
    const post = await posts.findByPk(id);
    res.json(post)
}); 

router.post('/', validateToken, async (req, res) => {
    const post = req.body;
    const username = req.user.username;
    await posts.create(post);
    res.json(post);
});

module.exports = router;