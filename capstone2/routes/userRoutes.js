const express = require('express');
const userController = require("../controllers/userController");
const auth = require('../auth');
const { verify, verifyAdmin } = auth;

const router = express.Router();

router.post('/checkEmail', userController.checkEmailExists)
router.post('/register', (req, res) => {
    userController.registerUser(req.body).then(resultFromController => {
        res.send(resultFromController)
    })
})
router.post('/login', userController.loginUser)

router.get("/:userId", userController.getUser)

module.exports = router;