require("express");
const fs = require("fs");
const Blog = require("./../models/blogModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllBlogs = catchAsync(async (req, res, next) => {
  const blogs = await Blog.find();

  res.status(200).json({
    status: "success",
    length: blogs.length,
    data: {
      blogs,
    },
  });
});

exports.getBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(new AppError("No blog found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      blog,
    },
  });
});

exports.createBlog = catchAsync(async (req, res, next) => {
  const newBlog = await Blog.create(req.body);

  res.status(200).json({
    status: "sucess",
    data: {
      blog: newBlog,
    },
  });
});

exports.updateBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!blog) {
    return next(new AppError("No blog found with that ID", 404));
  }

  res.status(200).json({
    message: "success",
    data: {
      blog,
    },
  });
});

exports.deleteBlog = catchAsync(async (req, res, next) => {
  let deletedBlog = await Blog.findByIdAndDelete(req.params.id);

  if (!deletedBlog) {
    return next(new AppError("No blog found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Deleted Successfully",
  });
});
