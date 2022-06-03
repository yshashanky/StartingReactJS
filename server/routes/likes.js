const express = require('express')
const { validateToken } = require('../middlewares/AuthMiddleware')
const router = express.Router()
const { likes } = require('../models')

router.post("/", validateToken, async (req, res) => {
    const { PostId} = req.body;
    const UserID = req.user.id;

    const found = await likes.findOne({ 
        where: { PostId: PostId, UserID: UserID }
    });
    
    if (!found) {
        await likes.create({ PostId: PostId, UserID: UserID });
    } else {
        await likes.destroy({
            where: {
                PostId: PostId, 
                UserID: UserID,
            }
        })
    }
    res.json("Success");
});

module.exports = router;