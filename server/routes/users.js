const express = require('express')
const router = express.Router()
const { users } = require('../models')
const bcrypt = require("bcrypt")

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

    if(!user) res.json({error: "User Doesn't Exist"});

    bcrypt.compare(password, user.password).then((match) => {
        if(!match) res.json({ error: "Wrong Username and Password!!!"});

        res.json("Logged in!!!");
    })
});


module.exports = router 
