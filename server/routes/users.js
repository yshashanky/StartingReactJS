const express = require('express')
const router = express.Router()
const { users } = require('../models')
const bcrypt = require("bcrypt")
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
    })
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
    })
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

module.exports = router 
