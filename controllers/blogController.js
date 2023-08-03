const fs = require('fs');

const blogs = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/blog.json`));

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

