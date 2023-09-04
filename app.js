const express = require("express");
const blogRouter = require("./routes/blogRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const app = express();
app.use(express.json());

// custom middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toLocaleDateString();

  next();
});

module.exports = app;

// app.get('/api/v1/blogs', getAllBlogs);
// app.get('/api/v1/blogs/:id', getBlog)
app.use("/api/v1/blogs", blogRouter);

// app.all("*", (req, res, next) => {
//   next(new AppError(`Requested URL ${req.originalUrl} not found`, 404));
// });

// global error handler
app.use(globalErrorHandler);
