import { Schema, model } from "mongoose";
import { crudOptions, crudRouterMaker } from "./shared.js";

const categoryUrl = "/categorys";
const categorySchema = new Schema(
	{
		name: { type: String },
		description: { type: String },
	},
	crudOptions(categoryUrl),
);
const Category = model("category", categorySchema);

const categoryRouter = crudRouterMaker(
	Category,
	"category",
	"/inventory/categorys",
);

export default {
	router: categoryRouter,
	model: Category,
	url: categoryUrl,
};
