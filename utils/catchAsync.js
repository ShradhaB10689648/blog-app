module.exports = (fn) => {
  return (req, res, next) => {
    console.log("hello from catch Async");
    fn(req, res, next).catch((err) => next(err));
  };
};
