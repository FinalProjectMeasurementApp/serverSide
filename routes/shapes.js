const express = require('express');
const router  = express.Router();
const images  = require('../helpers/images')
const {
  getAllSavedShapes,
  updateShapeData,
  addNewShapeData,
  deleteShapeData
} = require ('../controllers/shapeController')

router
  .get('/',getAllSavedShapes)
  .post('/add',images.multer.single('image'), images.sendUploadToGCS, addNewShapeData)
  .delete('/delete/:id',deleteShapeData)
  .put('/update/:id',updateShapeData)

module.exports = router;
