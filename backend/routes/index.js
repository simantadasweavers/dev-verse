const express = require('express');
const router = express.Router();
const userRoutes = require('./users');
const pageRoutes = require('./pages');

router.use(userRoutes);
router.use(pageRoutes);

module.exports = router;