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
const slugify = require('slugify');


router.post("/post", upload.single('thumbnail'), async (req, res) => {
    try {
        const mongo = await Mongo();
        const Blog = await mongo.model("Blog", BlogSchema);

        if (req.body.access_token) {
            try {
                let decoded = jwt.verify(req.body.access_token, process.env.ACCESS_TOKEN_PRIVATE_KEY);
                const baseSlug = slugify(req.body.title, { lower: true, strict: true });
                let uniqueSlug = baseSlug;
                let count = 1;
                while (await Blog.findOne({ slug: uniqueSlug })) {
                    uniqueSlug = `${baseSlug}-${count}`;
                    count++;
                }

                const blog = new Blog({
                    title: req.body.title,
                    content: req.body.content,
                    excerpt: req.body.excerpt,
                    slug: uniqueSlug,
                    thumbnail: req.file.filename,
                    userId: decoded.id,
                });
                blog.save();

                res.status(201).send({ "status": "success", "result": "Blog saved successfully" });
            } catch (err) {
                res.status(401).send({ "status": "failed", "result": "unauthorized" });
            }
        } else {
            res.status(500).send({ "status": "failed", "result": "provide your access token" });
        }
    } catch (err) {
        res.status(500).send({ "status": "failed", "result": err });
    }
});


router.post("/posts", async (req, res) => {
    try {
        const mongo = await Mongo();
        const Blog = await mongo.model("Blog", BlogSchema);

        if (req.body.access_token) {
            try {
                let decoded = jwt.verify(req.body.access_token, process.env.ACCESS_TOKEN_PRIVATE_KEY);
                let result = await Blog.find({userId: decoded.id});
                res.status(201).send({ "status": "success", "result": result });
            } catch (err) {
                res.status(401).send({ "status": "failed", "result": "unauthorized" });
            }
        } else {
            res.status(500).send({ "status": "failed", "result": "provide your access token" });
        }
    } catch (err) {
        res.status(500).send({ "status": "failed", "result": err });
    }
});


module.exports = router;