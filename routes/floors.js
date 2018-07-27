var express = require('express');
var router = express.Router();
var {getAllFloor,addNewFloor,deleteFloor} = require ('../controllers/floorController')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/',getAllFloor)
router.post('/add',addNewFloor)
router.delete('/delete/:id',deleteFloor)

module.exports = router;