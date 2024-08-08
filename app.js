import express from "express";
const app = express();

import mongoose from "mongoose";
mongoose.set("strictQuery", false);
(async () => {
	await mongoose.connect(process.env.DB_CONNECTION);
})().catch((err) => console.log(err));

// view engine setup
app.set("views", "./src");
app.set("view engine", "pug");

import logger from "morgan";
import cookieParser from "cookie-parser";
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("./public"));

import indexRouter from "./src/catalog/index.js";
import usersRouter from "./src/UsersRouter.js";
import boardRouter from "./src/Comment.js";
import catalogApp from "./src/catalog/index.js";
import { inventoryApp } from "./src/inventory/index.js";

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/board", boardRouter);
app.use("/catalog", catalogApp);
app.use("/inventory", inventoryApp);

// catch 404 and forward to error handler
import createError from "http-errors";
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

export default app;
