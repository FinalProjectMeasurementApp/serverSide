const express = require('express');
const router  = express.Router();
const {
  getAllUser,
  addNewUser,
  deleteUser
} = require ('../controllers/userController')

router
  .get('/',getAllUser)
  .post('/add',addNewUser)
  .delete('/delete/:id',deleteUser)

module.exports = router;