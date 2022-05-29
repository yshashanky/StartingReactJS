const {verify} = require("jsonwebtoken")

const validateToken = (req, res, next) => {
    const accessToken = req.header("acessToken");

    if (!accessToken) return res.send({error: "User not logged in"});

    try{
        const validToken = verify(accessToken, "importantsecret");

        if(validToken) {
            return next();
        }
    }
    catch (err) {
        return res.send({error: err});
    }
}

module.exports = {validateToken};