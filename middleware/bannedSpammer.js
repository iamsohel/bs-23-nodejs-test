const Spammer = require("../models/Spammer");

module.exports = async function (req, res, next) {
  const checkBanned = await Spammer.find({
    user: req.user.id,
    isSpammer: true,
  });
  console.log("checkBanned: mw", checkBanned);
  if (checkBanned.length >= 2) {
    const resObj = {
      success: false,
      message: "You are banner from this service",
    };
    return res.status(403).send(resObj);
  }

  next();
};
