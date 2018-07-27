var express = require('express');
var router = express.Router();
var {getAllUser,addNewUser,deleteUser} = require ('../controllers/userController')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/',getAllUser)
router.post('/add',addNewUser)
router.delete('/delete/:id',deleteUser)

module.exports = router;