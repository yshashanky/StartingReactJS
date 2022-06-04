const express = require('express')
const router = express.Router()
const { posts, likes } = require('../models')

router.get('/', async (req, res) => {
    const listOfPosts = await posts.findAll({include: [likes] });
    res.json(listOfPosts)
});

router.get('/byId/:id', async (req, res) => {
    const id = req.params.id;
    const post = await posts.findByPk(id);
    res.json(post)
}); 

router.post('/', async (req, res) => {
    const post = req.body;
    await posts.create(post);
    res.json(post);
});

module.exports = router 
