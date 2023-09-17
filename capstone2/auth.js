const jwt = require('jsonwebtoken');
const secret = ("E-commerce");

module.exports.createAccessToken = (user) => {
    const data = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
    };
    return jwt.sign(data, secret, {})
}

module.exports.verify = (req, res, next) => {
    console.log(req.header.authorization);
    let token = req.headers.authorization;

    if (typeof token === 'undefined') {
        return res.send({ auth: 'Failed User has No Token' })
    }
    else {
        console.log(token);
        token = token.slice(7, token.length);
        console.log(token);

        jwt.verify(token, secret, function (error, decodedToken) {
            if (error) {
                return res.send({
                    auth: "Failed",
                    message: error.message
                });
            }
            else {
                console.log(decodedToken);
                req.user = decodedToken;
                next();
            }
        })
    }
}

module.exports.verifyAdmin = (req, res, next) => {
    if (req.user.isAdmin) {
        next();
    }
    else {
        return res.send({
            auth: 'Failed',
            message: "You need Admin Account to do this"
        })
    }
}