const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
const errorLogger = (err, req, res, next) => {
  // logs error to console and then passes to next middleware
  console.error(err.stack);
  next(err);
}
module.exports = { notFound, errorHandler, errorLogger };
