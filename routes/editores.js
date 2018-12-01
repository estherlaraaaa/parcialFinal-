var express = require('express');
var router = express.Router();
const editores = require ('../controllers/editores'); 

router.get('/', editores.findAll); 

router.post('/', editores.create);

router.post('/:editorId', editores.update);

router.delete ('/:editorId', editores.delete); 

module.exports = router; 
