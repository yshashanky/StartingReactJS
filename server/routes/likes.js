const express = require('express')
const { validateToken } = require('../middlewares/AuthMiddleware');
const router = express.Router();
const { likes } = require('../models');

router.post("/", validateToken, async (req, res) => {
    const { PostId} = req.body;
    const UserId = req.user.id;

    const found = await likes.findOne({ 
        where: { postId: PostId, userId: UserId }
    });

    if (!found) {
        await likes.create({ postId: PostId, userId: UserId });
        res.json("Liked the post");
    } else {
        await likes.destroy({
            where: {
                postId: PostId, 
                userId: UserId,
            }
        })
        res.send("Unliked the post");
    }
});

module.exports = router;