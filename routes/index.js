var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/tasks/all/', function(req, res, next) {
	var data = fs.readFileSync('./data/taskList.json');
	console.log();
	var allTasks = data.toString();
	

    res.send(allTasks);
});
router.post('/tasks/all/', function(req, res, next) {
	var data = fs.readFileSync('./data/taskList.json');
	
	var allTasks = data.toString();

	var allTask = req.body;
	console.log(allTask);
	// allTask.taskListModel.forEach(function(){

	// });
	

  res.send(allTasks);
});


module.exports = router;
