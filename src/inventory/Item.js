import { Router } from "express";
import { Schema, model } from "mongoose";
import { crudOptions, crudRouterMaker } from "./shared.js";

const url = "/items";
const itemSchema = new Schema(
	{
		name: { type: String },
		description: { type: String },
		price: { type: Number },
		stock: { type: Number },
		category: { type: Schema.Types.ObjectId, ref: "category" },
	},
	crudOptions(url),
);

const Item = model("item", itemSchema);
const itemRouter = crudRouterMaker(Item, "item", url);

export default {
	router: itemRouter,
	model: Item,
	url,
};
