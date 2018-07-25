var express = require('express');
var router = express.Router();
var {getAllSavedShapes,updateShapeData,addNewShapeData,deleteShapeData} = require ('../controllers/shape-controller')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/',getAllSavedShapes)
router.post('/add',addNewShapeData)
router.delete('/delete/:id',deleteShapeData)
router.put('/update/:id',updateShapeData)

module.exports = router;
