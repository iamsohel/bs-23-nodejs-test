const express = require("express");
const router = express.Router();
const jwtAuth = require("../middleware/jwtAuth");
const roleManager = require("../middleware/roleManager");
const Spammer = require("../models/Spammer");

// @route  comment api/spammers
// @desc mark/unmark spammer
// @access Private
router.post("/", [jwtAuth, roleManager], async (req, res) => {
  try {
    const spammer = new Spammer({
      isSpammer: req.body.isSpammer,
      user: req.user.id,
    });
    const newSpammer = await spammer.save();

    const resObj = {
      success: true,
      data: newSpammer,
    };
    res.status(200).send(resObj);
  } catch (error) {
    const resObj = {
      success: false,
      message: "something went wrong",
    };
    res.status(500).send(resObj);
  }
});

module.exports = router;
