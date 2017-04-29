var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
router.get('/tasks/all/', function(req, res, next) {
	var data = fs.readFile('../data/taskList.json');
	console.log(data);

  res.send('respond with a resource');
});

module.exports = router;
