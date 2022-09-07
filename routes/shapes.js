const express = require('express');
const router = express.Router();
const upload = require("../helpers/multer");
const {
  uploadImage,
  getAllSavedShapes,
  updateShapeData,
  addNewShapeData,
  deleteShapeData
} = require('../controllers/shapeController')

router
  .get('/', getAllSavedShapes)
  .post('/upload', upload.single('image'), uploadImage)
  .post('/add',upload.single('image'), addNewShapeData)
  .delete('/delete/:id',deleteShapeData)
  .put('/update/:id',updateShapeData)

module.exports = router;
