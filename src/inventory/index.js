import e from "express";

export const inventoryApp = e();
inventoryApp.set("views", import.meta.dirname);

import Category from "./Category.js";
import Item from "./Item.js";

[Category, Item].forEach((x) => {
	inventoryApp.use(x.url, x.router);
});

inventoryApp.get("/", async (req, res, next) => {
	res.render("layout");
});
