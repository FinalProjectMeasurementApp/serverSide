const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const shapeSchema = new Schema ({
    name:{type: String, required:true},
    area:{type: Number, required: true},
    perimeter:{type: Number, required: true},
    sides:{type: Array, require: true}
},{timestamps:true})

mongoose.model('shape', shapeSchema)

const shape = mongoose.model('shape',shapeSchema)

module.exports=shape