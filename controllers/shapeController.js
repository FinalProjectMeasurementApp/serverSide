const Shape    = require("../models/shape");
const mongoose = require('mongoose');

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

  addNewShapeData: (req, res, next) => {
    const id = mongoose.Types.ObjectId(req.body.username);
    let shapeData = {
      username: id,
      name: req.body.name,
      area: req.body.area,
      perimeter: req.body.perimeter,
      coordinates: req.body.coordinates,
      lengths: req.body.lengths,
      image: req.file.cloudStoragePublicUrl,
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
      area: req.body.area,
      perimeter: req.body.perimeter,
      coordinates: req.body.coordinates,
      lengths: req.body.lengths,
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
