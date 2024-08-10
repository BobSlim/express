import e from "express";
const catalogApp = e();

import authors from "./Author.js";
import books from "./Book.js";
import genres from "./Genre.js";

catalogApp.set("views", import.meta.dirname);
for (const element of [genres, authors, books]) {
	catalogApp.use(element.url, element.router);
}

/* GET home page. */
catalogApp.get("/", (req, res, next) => {
	res.render("layout", { title: "Express" });
});

export default catalogApp;
