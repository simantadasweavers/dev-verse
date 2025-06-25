const express = require('express');
const router = express.Router();
const userRoutes = require('./users');
const pageRoutes = require('./pages');
const blogRoutes = require('./blogs');

router.use(userRoutes);
router.use(pageRoutes);
router.use(blogRoutes);

module.exports = router;