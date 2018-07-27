const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const floorSchema = new Schema(
  {
    type: { type: String, required: true},
    area: { type: Number, required: true },
    price: { type: Number, required: true }
  },
  { timestamps: true }
);

mongoose.model("floor", floorSchema);

const floor = mongoose.model("floor", floorSchema);

module.exports = floor;
