const express = require('express');
const router = express.Router();
const blogController = require('./../controllers/blogController')


router
.route('/')
.get(blogController.getAllBlogs);

router
.route('/:id')
.get(blogController.getBlog);

module.exports = router