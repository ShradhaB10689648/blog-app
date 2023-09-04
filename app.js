const express = require("express");

const blogRouter = require("./routes/blogRoutes");
const app = express();
app.use(express.json());

// custom middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toLocaleDateString();
  console.log(req.requestTime);
  next();
});

module.exports = app;

// app.get('/api/v1/blogs', getAllBlogs);
// app.get('/api/v1/blogs/:id', getBlog)
app.use("/api/v1/blogs", blogRouter);

app.use("*", (req, res, next) => {
  // Route specific error
  //   res.status(404).json({
  //     message: `Requested URL ${req.originalUrl} not found`,
  //     status: "fail",
  //   });

  const err = new Error(`Requested URL ${req.originalUrl} not found`);
  err.statusCode = 400;
  err.status = "fail";
  console.log("fisrt");
  next(err);
});

// global error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  console.log("second");
  res.status(err.statusCode).json({
    message: err.message,
    status: err.status,
  });
});
