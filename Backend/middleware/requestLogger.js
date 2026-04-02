const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const level = status >= 500 ? "ERROR" : status >= 400 ? "WARN " : "API  ";

    console.log(
      `${level} ${req.method} ${req.originalUrl} ${status} ${duration}ms`,
    );
  });

  next();
};

module.exports = { requestLogger };
