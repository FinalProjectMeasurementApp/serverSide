const express = require('express');
const router  = express.Router();
const {
  getAllSavedShapes,
  updateShapeData,
  addNewShapeData,
  deleteShapeData
} = require ('../controllers/shape-controller')

router
  .get('/',getAllSavedShapes)
  .post('/add',addNewShapeData)
  .delete('/delete/:id',deleteShapeData)
  .put('/update/:id',updateShapeData)

module.exports = router;
