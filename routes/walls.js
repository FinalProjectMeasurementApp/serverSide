const express = require('express');
const router  = express.Router();
const { 
  getAllWall,
  addNewWall,
  deleteWall 
} = require ('../controllers/wallController')

router
  .get('/',getAllWall)
  .post('/add',addNewWall)
  .delete('/delete/:id',deleteWall)

module.exports = router;