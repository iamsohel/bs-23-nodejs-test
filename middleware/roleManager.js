module.exports = function (req, res, next) {
  if (!req.user.role !== "blogger") {
    const resObj = {
      success: false,
      message: "Access Denied",
    };
    return res.status(403).send(resObj);
  }

  next();
};
