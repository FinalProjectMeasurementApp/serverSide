const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shapeSchema = new Schema(
  {
    username: { 
      type: Schema.Types.ObjectId, ref: 'User'
    },
    name: { 
      type: String, required: true 
    },
    area: { 
      type: Number, required: true 
    },
    perimeter: { 
      type: Number, required: true 
    },
    coordinates: [[{type: Number, required:true}]]
  },
  { 
    timestamps: true 
  }
);

mongoose.model("shape", shapeSchema);

const shape = mongoose.model("shape", shapeSchema);

module.exports = shape;
