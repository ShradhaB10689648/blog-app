const express = require('express');

const blogRouter = require('./routes/blogRoutes');
const app = express();
app.use(express.json());

// custom middleware
app.use((req,res,next)=>{
    req.requestTime = new Date().toLocaleDateString();
    console.log(req.requestTime)
    next();
})

module.exports = app;



// app.get('/api/v1/blogs', getAllBlogs);
// app.get('/api/v1/blogs/:id', getBlog)
app.use('/api/v1/blogs', blogRouter);


