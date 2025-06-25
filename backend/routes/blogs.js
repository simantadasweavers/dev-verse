const express = require('express');
const router = express.Router();
const multer = require('multer');
const Mongo = require('../database/mongoose');
const BlogSchema = require('../schemas/Blogs');
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


router.post("/posts", upload.single('thumbnail'), async (req, res) => {
    try {   
        const mongo = await Mongo();
        const Blog = await mongo.model("blogs", BlogSchema);
        const blog = await new Blog({
            title: req.body.title,
            content: req.body.content,
            excerpt: req.body.excerpt,
            thumbnail: req.file.filename,
        });
        blog.save();

        res.status(201).send({ "status": "success", "result": blog });
    } catch (err) {
        res.status(500).send({ "status": "failed", "result": err });
    }

});


module.exports = router;