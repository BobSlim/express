import { Router } from "express";
import { Schema, model } from "mongoose";

const authorUrl = "/catalog/authors"

const AuthorSchema = new Schema({
    first_name: { type: String, required: true, maxLength: 100 },
    family_name: { type: String, required: true, maxLength: 100 },
    date_of_birth: { type: Date },
    date_of_death: { type: Date },
});

AuthorSchema.virtual("name").get(function () {
    let fullname = "";
    if (this.first_name && this.family_name) {
        fullname = `${this.family_name}, ${this.first_name}`;
    }
    return fullname;
});

AuthorSchema.virtual("url").get(function () {
    return `${authorUrl}/${this._id}`;
});

// Export model
const Author = model("Author", AuthorSchema);
/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const getAuthors = async (req, res, next) => {
    const authors = await Author.find({}).exec()
    return res.render("authors", {authors})
}
/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const getAuthor = async (req, res, next) => {
    const author = await Author.findById(req.params.id).exec()
    return res.json(author)
}
/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const postAuthor = async (req, res, next) => {
    const newAuthor = new Author(req.body)
    newAuthor.save()
    return res.json(newAuthor)
    
}
const AuthorRouter = Router()
AuthorRouter.get("/", getAuthors)
AuthorRouter.get("/:id", getAuthor)
AuthorRouter.post("/", postAuthor)

export default {
    router: AuthorRouter,
    model: Author,
    schema: AuthorSchema,
    url: authorUrl
}