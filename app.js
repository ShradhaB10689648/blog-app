const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

// custom middleware
app.use((req,res,next)=>{
    req.requestTime = new Date().toLocaleDateString();
    console.log(req.requestTime)
    next();
})

const port = 4000;
const blogs = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/blog.json`));


const blogRouter = express.Router();
// fetch list of blogs
const getAllBlogs = (req, res) =>{
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
const getBlog = (req, res) =>{
    const id = req.params.id * 1;
    const blog = blogs.find(el=>el.id === id);
   
    res.status(200).json({
        status: 'success',
        data: {
            blog
        }
    })
}


// app.get('/api/v1/blogs', getAllBlogs);
// app.get('/api/v1/blogs/:id', getBlog)
app.use('/api/v1/blogs', blogRouter);
blogRouter
.route('/')
.get(getAllBlogs);

blogRouter
.route('/:id')
.get(getBlog);


//creating server
app.listen(port, ()=>{
    console.log('From port 4000')
})

