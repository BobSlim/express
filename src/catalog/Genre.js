import { Router } from "express";
import { Schema, model } from "mongoose";

const GenreSchema = new Schema({
    name: {type: String, required: true, max_length: 160, min_length: 8},
})
const GenreModel = model("Genre", GenreSchema)

const getGenres = async (req, res, next) => {
    const genres = await GenreModel.find({})
    return res.render("genre", {genres})
}

/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const getGenre = async (req, res, next) => {
    const genre = await GenreModel.findById(req.params.id).exec()
    return res.json(genre);
}

const postGenre = async (req, res, next) => {
    const newGenre = new GenreModel({
        name: req.body.name,
    })
    newGenre.save()
    return res.send(newGenre.id)
}

const GenreRouter = Router()
GenreRouter.get("/", getGenres)
GenreRouter.get('/:id', getGenre)
GenreRouter.post("/", postGenre)

export default {
    router: GenreRouter,
    model: GenreModel,
    schema: GenreSchema,
    url: "/catalog/genres",
}