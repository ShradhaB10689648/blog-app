const { json } = require('express');
const fs = require('fs');

const blogs = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/blog.json`));

exports.checkId = (req, res, next, val) => {
    if(req.params.id * 1 > blogs.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        })
    }
    console.log(val);
    next();
}

exports.checkBody = (req, res, next, val) =>{
    // const result = val.hasOwnProperty('name') && val.hasOwnProperty('price') ? true : false;
    // console.log(result);
    if(!req.body.name || !req.body.price) {
        res.status(400).json({
            status: fail,
            message: 'Missing name or price'
        })
    }
    next();
}


// fetch list of blogs
exports.getAllBlogs = (req, res) =>{
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        length: blogs.length,
        data: {
            blogs
        }
    })
}

// fetch single blog
exports.getBlog = (req, res) =>{
    const id = req.params.id * 1;
    const blog = blogs.find(el=>el.id === id);
   
    res.status(200).json({
        status: 'success',
        data: {
            blog
        }
    })
}

exports.createBlog = (req, res) =>{
    const id = blogs[blogs.length - 1].id + 1;
    const newBlog = Object.assign({id: id}, req.body);

    blogs.push(newBlog);

    fs.writeFile(`${__dirname}/dev-data/blog.json`, JSON.stringify(blogs), err =>{
        res.status(200).json({
            status: 'sucess',
            data: {
                blog: newBlog
            }
        })
    })
}

