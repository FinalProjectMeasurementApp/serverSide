const Floor    = require("../models/floor");

module.exports = {
  getAllFloor: (req, res, next) => {
    Floor
      .find({})
      .sort({ createdAt: "desc" })
      .then(floor => {
        res.status(200).send(floor);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },

  addNewFloor: (req, res, next) => {
    let floorData = {
      type: req.body.type,
      area: req.body.area,
      price: req.body.price
    }
    let newFloor = new Floor(floorData);
    newFloor
      .save()
      .then(floor => {
        res.status(200).send(floor);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },

  deleteFloor: (req, res, next) => {
    Floor
      .findByIdAndRemove(req.params.id)
      .then(floor => {
        res.status(200).send(floor);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }
};
