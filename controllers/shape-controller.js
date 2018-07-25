const Shape = require ('../models/shape')


module.exports={
    getAllSavedShapes:(req,res,next)=>{
        Shape.find({})
        .sort({createdAt:'desc'})
        .then(shape=>{
            res.status(200).send(shape)
        })
        .catch(err=>{
            res.status(400).send(err)
        })
    },

    addNewShapeData:(req,res,next)=>{
        let shapeData ={
            name:req.body.name,
            area:req.body.area,
            perimeter:req.body.perimeter,
            sides:[]
        }

        let newShape = new Shape(shapeData)
        newShape.save()
        .then(shape=>{
            res.status(200).send(shape)
        })
        .catch(err=>{
            res.status(400).send(err)
        })
    },

    deleteShapeData:(req,res,next)=>{
        Shape.findByIdAndRemove(req.params.id)
        .then(shape=>{
            res.status(200).send(shape)
        })
        .catch(err=>{
            res.status(400).send(err)
        })
    },

    updateShapeData:(req,res,next)=>{
        let newShape={
            name:req.body.name,
            area:req.body.area,
            perimeter:req.body.perimeter,
            sides:[]
        }

        Shape.findByIdAndUpdate(req.params.id,newShape)
        .then(updated=>{
            res.status(200).send(updated)
        })
        .catch(err=>{
            res.status(400).send(err)
        })
    }
}