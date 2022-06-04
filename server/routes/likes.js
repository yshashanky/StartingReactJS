const express = require('express')
const { validateToken } = require('../middlewares/AuthMiddleware');
const router = express.Router();
const { likes } = require('../models');

router.get('/', validateToken, async (req, res) => {
    const likedPost = await likes.findAll({where: { userId: req.user.id}})
    res.json( likedPost );
});

router.post("/", validateToken, async (req, res) => {
    const { PostId } = req.body;
    const UserId = req.user.id; 

    const found = await likes.findOne({ 
        where: { postId: PostId, userId: UserId }
    });

    if (!found) {
        await likes.create({ postId: PostId, userId: UserId });
        res.json({liked: true});
    } else {
        await likes.destroy({
            where: {
                postId: PostId,
                userId: UserId,  
            }
        })
        res.send({liked: false});
    } 
}); 

module.exports = router;