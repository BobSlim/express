import { Router } from "express";

export const crudRouterMaker = (mongooseModel, listView, url) => {
	const newRouter = Router();
	newRouter.get("/", async (req, res, next) => {
		const categorys = await mongooseModel.getAll();
		return res.render(listView, { categorys });
	});
	newRouter.post("/", async (req, res, next) => {
		await mongooseModel.create(req.body);
		res.redirect(url);
	});
	newRouter.get("/:id", async (req, res, next) => {
		return res.json(await mongooseModel.getOne(req.params.id));
	});
	newRouter.put("/:id", async (req, res, next) => {
		return res.json(await mongooseModel.replace(req.params.id, req.body));
	});
	newRouter.delete("/:id", async (req, res, next) => {
		return res.json(await mongooseModel.remove(req.params.id));
	});
	return newRouter;
};

export const crudOptions = (baseUrl) => ({
	statics: {
		async getAll() {
			return await this.find({}).exec();
		},
		async create(data) {
			const newObj = new this(data);
			await newObj.save();
			return newObj;
		},
		async getOne(id) {
			return await this.findById(id).exec();
		},
		async replace(id, data) {
			const replacement = new this(data);
			return await this.findOneAndReplace({ _id: id }, replacement, {
				returnDocument: "after",
				upsert: true,
			}).exec();
		},
		async remove(id) {
			return await this.findByIdAndDelete(id).exec();
		},
	},
	virtuals: {
		url: {
			get() {
				return `${baseUrl}/${this._id}`;
			},
		},
	},
});
