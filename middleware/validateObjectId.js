const mongoose = require("mongoose");

module.exports = function (req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    const resObj = {
      success: false,
      message: "Invalid ID.",
    };
    return res.status(404).send(resObj);
  }

  next();
};
