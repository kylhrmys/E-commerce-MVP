const User = require('../models/User');
const bcrypt = require('bcrypt');
const auth = require('../auth');
const Products = require('../models/Products');

module.exports.checkEmailExists = (reqBody) => {
    return User.find({ email: reqBody.email }).then(result => {
        if (result.length > 0) {
            return true;
        }
        else {
            return false;
        }
    })
}

module.exports.registerUser = (reqBody) => {
    let newUser = new User({
        email: reqBody.email,
        password: bcrypt.hashSync(reqBody.password, 10)
    })

    return newUser.save().then((user, error) => {
        if (error) {
            return false;
        }
        else {
            return true;
        }
    }).catch(error => error)
};

module.exports.loginUser = (req, res) => {
    return User.findOne({ email: req.body.email }).then(result => {
        if (result == null) {
            return false;
        }
        else {
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);

            if (isPasswordCorrect) {
                return res.send({ access: auth.createAccessToken(result) })
            }
            else {
                return res.send(false)
            }
        }
    }).catch(err => res.send(err))
}

module.exports.getUser = (req, res) => {
    return User.findById(req.params.userId).then(result => {
        res.send(result)
    })
};
