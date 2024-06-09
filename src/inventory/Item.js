import { Router } from "express";
import { Schema, model } from "mongoose";

const itemSchema = new Schema({
    name: {type: String},
    description: {type: String},
    price: {type: Number},
    stock: {type: Number},
    category: {type: Schema.Types.ObjectId, ref: "category"}
})

const Item = model("item", itemSchema)
const getAll = async () => await Item.find({}).exec()
const getOne = async (id) => await Item.findById(id).exec()
const create = async (data) => {
    const newCategory = new Item(data)
    await newCategory.save()
    return newCategory
}

const itemRouter = Router()

const url = "/items"
itemRouter.get("/", async (req, res, next) => {
    return res.render("item", {items: await getAll()})
})
itemRouter.get("/:id", async (req, res, next) => {
    return res.json(await getOne(req.params.id))
})
itemRouter.post("/", async (req, res, next) => {
    await create(req.body)
    res.redirect(`.${url}`)
})

export default {
    router: itemRouter,
    model: Item,
    url,
}