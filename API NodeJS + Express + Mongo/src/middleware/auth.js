const jwt = require('jsonwebtoken');
const authConfig = require("../config/auth.json")


module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).send({ error: "No token provied" })
    }

    const parts = authHeader.split(' ')

    if (parts.length === 2) {
        console.log("aaaaaaaaa")
        return res.status(401).send({ error: "Token error" })
        
    }

    const [ scheme, token ] = parts;

  /*   if (!/^Bearer$/i.test(scheme)){
        return res.status(401).send({ error:"token malformated"})
    } */

    jwt.verify(token , authConfig.secret , (err, decoded) =>{
        if(err) return res.status(401).send ({error: "token dont match"})

        req.userID = decoded.id

        return next()

    })

}