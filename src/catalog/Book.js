import { Router } from "express";
import { Schema, model } from "mongoose";
import Genre from "./Genre.js";
import AuthorModel from "./Author.js";

const bookUrl = "/catalog/books"

const BookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
    summary: { type: String, required: true },
    isbn: { type: String, required: true },
    genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
});

// Virtual for book's URL
BookSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `${bookUrl}/${this._id}`;
});

// Export model
const BookModel = model("Book", BookSchema);

const BookRouter = Router()
BookRouter.get("/", async (req, res, next) => {
    const [books, genres, authors] = await Promise.all([
        BookModel.find({}).populate("genre").populate("author").exec(),
        Genre.model.find({}).exec(),
        AuthorModel.model.find({}).exec(),
    ])
    return res.render("books", { books, genres, authors })
})
BookRouter.get("/:id", async (req, res, next) => {
    const book = await BookModel.findById(req.params.id).exec()
    return res.json(book)
})
/**
 * 
 * @param {string} str 
 * @returns 
 */
const getNames = (str) => {
    const [first_name, family_name] = str.split(" ", 2);
    return { first_name, family_name }
}
BookRouter.post("/", async (req, res, next) => {
    try {
        const names = getNames(req.body.author)
        if (!names.first_name || !names.family_name) res.sendStatus(403).send("no names")
        const [author, genre] = await Promise.all([AuthorModel.model.findOneAndUpdate(names, names, { upsert: true, returnDocument: "after" }).exec(),
        Genre.model.findOneAndUpdate({ name: req.body.genre }, { name: req.body.genre }, { upsert: true, returnDocument: "after" }).exec()])
        const newBook = new BookModel({ ...req.body, author: author._id, genre: genre._id });
        await newBook.save()
        return res.json(newBook)
    } catch (error) {
        next(error)
    }
})

export default {
    router: BookRouter,
    model: BookModel,
    schema: BookSchema,
    url: bookUrl,
}