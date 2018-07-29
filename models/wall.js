const mongoose   = require("mongoose");
const Schema     = mongoose.Schema;
const wallSchema = new Schema(
  {
    type: { 
      type: String, required: true
    },
    area: { 
      type: Number, required: true 
    },
    price: {
      type: Number, required: true 
    }
  },
  { 
    timestamps: true 
  }
);

mongoose.model("wall", wallSchema);

const wall = mongoose.model("wall", wallSchema);

module.exports = wall;
