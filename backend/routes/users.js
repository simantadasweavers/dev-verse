const express = require('express');
const router = express.Router();
const multer = require('multer');
const Mongo = require('../database/mongoose');
const userSchema = require('../schemas/User');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage: storage });
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.BYCRYPT_SALT_ROUNDS);
const jwt = require('jsonwebtoken');



router.post('/user/register', upload.single('profile_img'), async (req, res) => {
    try {
        const mongo = await Mongo();
        const User = await mongo.model("User", userSchema);
        const result = await User.findOne({ "email": req.body.email }).exec();

        if (result == null) {
            bcrypt.hash(req.body.password, saltRounds, function (err, hashedPassword) {
                try {
                    const user = new User({
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        email: req.body.email,
                        password: hashedPassword,
                        skills: req.body.skills,
                        exp: parseInt(req.body.exp),
                        loc: req.body.loc,
                        profile_img: req.file.filename,
                    });
                    user.save();
                    
                    let access_token = jwt.sign({ email: user.email, id: user._id }, process.env.ACCESS_TOKEN_PRIVATE_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION });
                    let refresh_token = jwt.sign({ email: user.email, id: user._id }, process.env.REFRESH_TOKEN_PRIVATE_KEY, { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION });
                    res.status(201).send({ "status": "success", "result": user, "access_token": access_token, "refresh_token": refresh_token });
                } catch (err) {
                    res.status(400).send({ "status": "failed", "result": err });
                }
            });
        } else {
            res.status(409).send({ "status": "failed", "result": "email already exist" });
        }

    } catch (err) {
        console.error(err);
        res.status(500).send({ "status": "failed", "result": err });
    }
});


router.post('/user/login', async (req, res) => {
    try {
        const mongo = await Mongo();
        const User = await mongo.model("User", userSchema);
        const result = await User.findOne({ "email": req.body.email }).exec();

        if (result) {
            bcrypt.compare(req.body.password, result.password, function (err, isPasswordMatched) {
                if (isPasswordMatched) {
                    let access_token = jwt.sign({ email: result.email, id: result._id }, process.env.ACCESS_TOKEN_PRIVATE_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION });
                    let refresh_token = jwt.sign({ email: result.email, id: result._id }, process.env.REFRESH_TOKEN_PRIVATE_KEY, { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION });
                    res.status(201).send({ "status": "success", "result": result, "access_token": access_token, "refresh_token": refresh_token });
                } else {
                    res.status(401).send({ "status": "failed", "result": "password not match" });
                }
            });
        } else {
            res.status(409).send({ "status": "failed", "result": "email does not exist" });
        }

    } catch (err) {
        console.error(err);
        res.status(500).send({ "status": "failed", "result": err });
    }
});


router.post('/user/forget-password', async (req, res) => {
    try {
        const mongo = await Mongo();
        const User = await mongo.model("User", userSchema);
        const result = await User.findOne({ "email": req.body.email }).exec();

        if (result) {
            res.status(200).send({ "status": "success", "result": "OTP send to your email, hint: 3455" });
        } else {
            res.status(409).send({ "status": "failed", "result": "email does not exist" });
        }

    } catch (err) {
        console.error(err);
        res.status(500).send({ "status": "failed", "result": err });
    }
});


router.post('/user', async (req, res) => {
    try {
        const mongo = await Mongo();
        const User = await mongo.model("User", userSchema);
        if (req.body.access_token) {
            try {
                let decoded = jwt.verify(req.body.access_token, process.env.ACCESS_TOKEN_PRIVATE_KEY);
                let users = await User.findById(decoded.id).exec();
                res.status(200).send({ "status": "success", "result": users });
            } catch (err) {
                res.status(401).send({ "status": "failed", "result": "unauthorized" });
            }
        } else {
            res.status(500).send({ "status": "failed", "result": "provide your access token" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ "status": "failed", "result": err });
    }
});

module.exports = router;