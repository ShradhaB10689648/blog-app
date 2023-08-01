const express = require('express');
const fs = require('fs');

const app = express();

const port = 4000;
const blogs = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/blog.json`));

app.get('/api/v1/blogs', (req,res)=>{
    res.status(200).json({
        status: 'success',
        length: blogs.length,
        data: {
            blogs
        }
    })
})




//creating server
app.listen(port, ()=>{
    console.log('From port 3000', blogs)
})

