const { json } = require("express");
const fs = require("fs");
const Blog = require("./../models/blogModel");

// const blogs = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/blog.json`));

// exports.checkId = (req, res, next, val) => {
//     if(req.params.id * 1 > blogs.length) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid Id'
//         })
//     }
//     console.log(val);
//     next();
// }

// exports.checkBody = (req, res, next, val) =>{
//     // const result = val.hasOwnProperty('name') && val.hasOwnProperty('price') ? true : false;
//     // console.log(result);
//     if(!req.body.name || !req.body.content) {
//         res.status(400).json({
//             status: fail,
//             message: 'Missing name or content'
//         })
//     }
//     next();
// }

// fetch list of blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();

    res.status(200).json({
      status: "success",
      length: blogs.length,
      data: {
        blogs,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// fetch single blog
exports.getBlog = async (req, res) => {
  //   const id = req.params.id * 1;
  //   const blog = blogs.find((el) => el.id === id);

  try {
    const blog = await Blog.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        blog,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);

    res.status(200).json({
      status: "sucess",
      data: {
        blog: newBlog,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }

  // const id = blogs[blogs.length - 1].id + 1;
  // const newBlog = Object.assign({id: id}, req.body);

  // blogs.push(newBlog);

  // fs.writeFile(`${__dirname}/dev-data/blog.json`, JSON.stringify(blogs), err =>{
  //     res.status(200).json({
  //         status: 'sucess',
  //         data: {
  //             blog: newBlog
  //         }
  //     })
  // })
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: "success",
      data: {
        blog,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    let deletedBlog = await Blog.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      message: "Deleted Successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "error in deleting the post",
    });
  }
};
