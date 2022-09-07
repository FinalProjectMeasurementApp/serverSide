const Shape    = require("../models/shape");
const mongoose = require('mongoose');
const { cloudinary } = require("../helpers/cloudinary");

module.exports = {
  getAllSavedShapes: (req, res, next) => {
    Shape
      .find({})
      .populate("username")
      .sort({ createdAt: "desc" })
      .then(shape => {
        res.status(200).send(shape);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },

  uploadImage: async (req, res) => {
		const file = req.file.path;
		const options = {
			resource_type: "auto",
			unsigned: true,
			upload_preset: process.env.UPLOAD_PRESET,
			public_id: req.body.title,
			tags: req.body.title
		}
		const image = await cloudinary.uploader.upload(file, options);
		console.log("result: ", image);
		const imgUrl = image.secure_url
		res.status(200).json({
			imgUrl,
			status: 200,
			message: 'Your image is successfully uploaded',
		});
	},

  addNewShapeData: async (req, res, next) => {
    const file = req.file.path;
		const options = {
			resource_type: "auto",
			unsigned: true,
			upload_preset: process.env.UPLOAD_PRESET,
			public_id: req.body.title,
			tags: req.body.title
		}
		const image = await cloudinary.uploader.upload(file, options);
		console.log("result: ", image);
		const imgUrl = image.secure_url
    const id = mongoose.Types.ObjectId(req.body.username);
    for (let i = 0; i < req.body.coordinates.length; i++) {
      req.body.coordinates[i][0] = +req.body.coordinates[i][0]
      req.body.coordinates[i][1] = +req.body.coordinates[i][1]
      req.body.coordinates[i][2] = +req.body.coordinates[i][2]
    }
    for (let i = 0; i < req.body.lengths.length; i++) {
      req.body.lengths[i] = +req.body.lengths[i]
    }
    req.body.area = +req.body.area
    req.body.perimeter = +req.body.perimeter
    let shapeData = {
      username: id,
      name: req.body.name,
      area: req.body.area,
      perimeter: req.body.perimeter,
      coordinates: req.body.coordinates,
      lengths: req.body.lengths,
      image: imgUrl,
      type: req.body.type
    };

    let newShape = new Shape(shapeData);
    newShape
      .save()
      .then(shape => {
        res.status(200).send(shape);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },

  deleteShapeData: (req, res, next) => {
    Shape
      .findByIdAndRemove(req.params.id)
      .then(shape => {
        res.status(200).send(shape);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },

  updateShapeData: (req, res, next) => {
    const id = mongoose.Types.ObjectId(req.body.username);
    let updatedShape = {
      username: id,
      name: req.body.name,
      area: +req.body.area,
      perimeter: +req.body.perimeter,
      coordinates: +req.body.coordinates,
      lengths: +req.body.lengths,
      image: req.body.image,
      type: req.body.type
    };

    Shape.findByIdAndUpdate(
      req.params.id,
      { $set: updatedShape },
      { new: true }
    )
      .then(updated => {
        res.status(200).send(updated);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }
};
