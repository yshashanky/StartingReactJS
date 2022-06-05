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

router.get('/byUserId/:id', async (req, res) => {
    const id = req.params.id;
    const listOfPosts = await posts.findAll({include: [likes],
        where: {
        userId: id
    }});
    res.json(listOfPosts)
}); 

router.post('/', validateToken, async (req, res) => {
    const post = req.body;
    post.username = req.user.username;
    post.userId = req.user.id;
    await posts.create(post);
    res.json(post);
});

router.put('/title', validateToken, async (req, res) => {
    const { newTitle, id } = req.body;
    await posts.update({title: newTitle}, {where: {
        id: id
    }});
    res.json( newTitle );
});

router.put('/postText', validateToken, async (req, res) => {
    const { newPostText, id } = req.body;
    await posts.update({postText: newPostText}, {where: {
        id: id
    }});
    res.json( newPostText );
});

router.delete('/delete/:postId', validateToken, async(req, res) => {
    const postId = req.params.postId;
    await posts.destroy({
        where: {
            id: postId,
        }
    });
    res.json("deleted successfully");
});

module.exports = router;