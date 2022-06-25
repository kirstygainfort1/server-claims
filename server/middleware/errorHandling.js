const errorHandling = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({ message: err.message || "Internal server error" });
};

module.exports = { errorHandling };
