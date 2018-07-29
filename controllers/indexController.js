const Index    = require("../models/index");
module.exports = {
  getIndex: (req, res, next) => {
    res.status(200).send(Index.text);
  }
}