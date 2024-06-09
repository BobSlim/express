import e from "express";
const catalogApp = e();

import genres from "./Genre.js";
import authors from "./Author.js";
import books from "./Book.js";

catalogApp.set("views", import.meta.dirname);
[genres, authors, books].forEach((x) => {
	catalogApp.use(x.url, x.router);
});

/* GET home page. */
catalogApp.get("/", function (req, res, next) {
	res.render("../index.pug", { title: "Express" });
});

export default catalogApp;
