var express = require('express');
var router = express.Router();
var {getAllWall,addNewWall,deleteWall} = require ('../controllers/wallController')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/',getAllWall)
router.post('/add',addNewWall)
router.delete('/delete/:id',deleteWall)

module.exports = router;