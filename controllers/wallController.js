const Wall = require("../models/wall");

module.exports = {
  getAllWall: (req, res, next) => {
    Wall.find({})
      .sort({ createdAt: "desc" })
      .then(wall => {
        res.status(200).send(wall);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },

  addNewWall: (req, res, next) => {
    let wallData = {
      type: req.body.type,
      area: req.body.area,
      price: req.body.price
    }
    let newWall = new Wall(wallData);
    newWall
      .save()
      .then(wall => {
        res.status(200).send(wall);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },

  deleteWall: (req, res, next) => {
    Wall.findByIdAndRemove(req.params.id)
      .then(wall => {
        res.status(200).send(wall);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }
};
