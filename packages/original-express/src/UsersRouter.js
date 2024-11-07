import express from "express";
const router = express.Router();

/* GET users listing. */
router.get("/", (req, res, next) => {
	res.render("./users.pug");
});

export default router;
