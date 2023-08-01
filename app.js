const express = require('express');
const fs = require('fs');

const app = express();

const port = 4000;
const blogs = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/blog.json`));

// fetch list of blogs
app.get('/api/v1/blogs', (req,res)=>{
    res.status(200).json({
        status: 'success',
        length: blogs.length,
        data: {
            blogs
        }
    })
})

// fetch single blog
app.get('/api/v1/blogs/:id', (req, res)=>{
   
    const id = req.params.id * 1;
    const blog = blogs.find(el=>el.id === id);
   
    res.status(200).json({
        status: 'success',
        data: {
            blog
        }
    })
})




//creating server
app.listen(port, ()=>{
    console.log('From port 4000')
})

