const express = require('express');
const router = express.Router();
const blogController = require('./../controllers/blogController')

router.param('id', blogController.checkId);
// router.param({}, blogController.checkBody)

router
.route('/')
.get(blogController.getAllBlogs)
.post(blogController.createBlog);

router
.route('/:id')
.get(blogController.getBlog);

module.exports = router