const express = require("express");
const router = express.Router();
const jwtAuth = require("../middleware/jwtAuth");
const validateObjectId = require("../middleware/validateObjectId");
const roleManager = require("../middleware/roleManager");
const Comment = require("../models/Comment");
const BannedComment = require("../models/BannedComment");

// @route  comment api/comment
// @desc create new comment
// @access Private
router.post("/", jwtAuth, async (req, res) => {
  try {
    const comment = new Comment({
      text: req.body.text,
      user: req.user.id,
      postId: req.user.postId,
    });
    const newComment = await comment.save();

    const resObj = {
      success: true,
      data: newComment,
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

// @route  comment api/comment/banned/comment_id
// @access Private
router.post("/banned/:id", jwtAuth, async (req, res) => {
  try {
    const bannedComment = new BannedComment({
      commentId: req.params.id,
    });
    const newBannedComment = await bannedComment.save();

    const resObj = {
      success: true,
      data: newBannedComment,
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

// @route  comment api/comment/up-vote/:comment_id
// @desc up-vote a comment
// @access Private
router.post("/up-vote/:id", [jwtAuth, validateObjectId], async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    const resObj = {
      success: false,
      message: "No comment found with given id",
    };
    return res.status(400).send(resObj);
  }

  //check user already liked the comment
  const checkLiked =
    comment.upVote.filter((item) => item.user == req.user.id).length > 0;
  if (checkLiked) {
    const resObj = {
      success: false,
      message: "You already up vote to this the comment",
    };
    return res.status(400).send(resObj);
  }
  comment.upVote.unshift({ user: req.user.id });
  const updatedComment = await comment.save();

  const resObj = {
    success: true,
    data: updatedComment,
  };
  res.status(200).send(resObj);
});

// @route  comment api/comment/down-vote/:comment_id
// @desc down-vote a comment
// @access Private
router.post("/down-vote/:id", [jwtAuth, validateObjectId], async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    const resObj = {
      success: false,
      message: "No comment found with given id",
    };
    return res.status(400).send(resObj);
  }

  //check user already liked the comment
  const checkLiked =
    comment.downVote.filter((item) => item.user == req.user.id).length > 0;
  if (checkLiked) {
    const resObj = {
      success: false,
      message: "You already down vote to this the comment",
    };
    return res.status(400).send(resObj);
  }
  comment.downVote.unshift({ user: req.user.id });
  const updatedComment = await comment.save();

  const resObj = {
    success: true,
    data: updatedComment,
  };
  res.status(200).send(resObj);
});

// @route  DELETE api/comment/commenter/:commenter_id/:comment_id
// @desc delete a commenter all comments
// @access Private
router.delete(
  "/commenter/:id",
  [jwtAuth, validateObjectId, roleManager],
  async (req, res) => {
    try {
      const commenter = await Comment.deleteMany({ user: req.params.id });
      if (!commenter) {
        const resObj = {
          success: false,
          message: "The commenter with the given ID was not found.",
        };
        return res.status(404).send(resObj);
      }
      const resObj = {
        success: true,
        data: commenter,
        message: "deleted successfully",
      };
      res.status(200).send(resObj);
    } catch (error) {
      console.log(error);
      const resObj = {
        success: false,
        message: "something went wrong",
      };
      res.status(500).send(resObj);
    }
  }
);

module.exports = router;
