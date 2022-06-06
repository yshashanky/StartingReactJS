const express = require('express')
const router = express.Router()
const { users } = require('../models')
const bcrypt = require("bcryptjs")
const { validateToken } = require('../middlewares/AuthMiddleware')

const { sign } = require('jsonwebtoken')

router.post('/', async (req, res) => {
    const {username, password} = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        users.create({
            username: username,
            password: hash
        })
        res.json("User created");
    });
}); 

router.get('/allusers', async (req, res) => {
    const listOfUsers = await users.findAll({attributes: {
        exclude: ["password", "id", "createdAt", "updatedAt"]
    }});
    res.json(listOfUsers);
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await users.findOne({where: {username: username}});

    if(!user) return res.send({ error: "User Doesn't Exist" });

    bcrypt.compare(password, user.password).then((match) => {
        if(!match) return res.send({ error: "Wrong Username and Password!!!" });

        const accessToken = sign({username: user.username, id: user.id}, 
            "importantsecret");

        return res.send({token: accessToken, username: username, id: user.id});
    });
});

router.get('/verify', validateToken, (req, res) => {
    res.json(req.user);
});

router.get('/basicinfo/:id', async(req, res) => {
    const id = req.params.id;
    const basicInfo = await users.findByPk(id, {attributes: {
        exclude: ["password"]
    }});
    res.json(basicInfo);
}); 

router.put('/changepassword', validateToken, async(req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = await users.findOne({where: { username: req.user.username }});

    bcrypt.compare(oldPassword, user.password).then(async(match) => {
        if(!match) return res.send({ error: "Wrong Password!!!" });

        bcrypt.hash(newPassword, 10).then((hash) => {
            users.update(
                {password: hash},
                {where:{
                    username: req.user.username
                }});
        
            res.json("Update Password");
        });

    });

});

module.exports = router ;