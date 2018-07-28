const express = require('express');
const router  = express.Router();
const {
  getAllFloor,
  addNewFloor,
  deleteFloor
} = require ('../controllers/floorController')

router
  .get('/',getAllFloor)
  .post('/add',addNewFloor)
  .delete('/delete/:id',deleteFloor)

module.exports = router;