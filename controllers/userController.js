const User = require("../models/user");

module.exports = {
  getAllUser: (req, res, next) => {
    User.find({})
      .sort({ createdAt: "desc" })
      .then(user => {
        res.status(200).send(user);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },

  addNewUser: (req, res, next) => {
    let userData = {
      username: req.body.username
    };

    let newUser = new User(userData);
    newUser
      .save()
      .then(user => {
        res.status(200).send(user);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },

  deleteUser: (req, res, next) => {
    User.findByIdAndRemove(req.params.id)
      .then(user => {
        res.status(200).send(user);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }
};
