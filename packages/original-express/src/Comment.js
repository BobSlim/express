import express from "express";
/// @ts-check
import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
	text: { type: String, required: true },
	user: { type: String, required: true },
	added: { type: Date, required: true },
});

CommentSchema.virtual("url").get(function () {
	return `/board/${this._id}`;
});

const Comment = mongoose.model("Comment", CommentSchema);

const getComments = async (req, res, next) => {
	const messages = await Comment.find({}).exec();
	return res.render("comments", { title: "Express", messages });
};

const postComment = (req, res, next) => {
	const message = new Comment({
		text: req.body.text,
		user: req.body.user,
		added: new Date(),
	});
	message.save();
	res.redirect(".");
};

const router = express.Router();
router.get("/", getComments);
router.post("/", postComment);

export default router;
