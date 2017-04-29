(function (angular) {
var app = angular.module("taskApp",['ngResource','nvd3']);


app.controller("taskApp",function($scope,taskFactory,taskService) {

 $scope.model={
   taskListsModel:[]

 };


 $scope.assignedTo = ['Rick','Rahul','Matt'];

 $scope.addToList = function(taskList) {
 	
 	taskList.done = false;
 	taskList.id = parseInt(Math.random()*1000);
 	taskList.efforts = 50;
 	taskList.time = new Date();
 	console.log(taskList);
 	var taskLists = new taskFactory();
 	taskLists.deSerialize(taskList);

    $scope.model.taskListsModel.push(taskLists);
     $scope.updatePerformance();
    taskList={};
 }

$scope.saveModel = function(data) {
	console.log(data);
	var result=[];
	// data.forEach(function(mem,i){
 //       member = mem.id;

	// })

	taskService.post(data,function(res){
      console.log('post success')
	});

};


$scope.performanceData = [];

 $scope.updatePerformance = function(){
 	   console.log('inside');
 	   $scope.performanceData = [];
	   $scope.model.taskListsModel.forEach(function(task,index){

            var object= {
            	'key':'Task:'+task.displayName,
            	'values':[
                    {
                    	'time':task.time,
                    	'value':task.efforts
                    }
            	]
            }

           $scope.performanceData.push(object); 
           
	   });
	   console.log($scope.performanceData);

            
 };

    $scope.graphOption = {
                    chart: {
                        type: 'lineChart',
                        transitionDuration: 1000,
                        x: function (d) {
                            return new Date(d.time);
                        },
                        y: function (d) {
                            return d.value;
                        },
                        useInteractiveGuideline: true,
                        interactive: true,
                        xScale: d3.time.scale.utc(),
                        xAxis: {
                            axisLabel: 'Time',
                            tickFormat: function (d) {
                                return d3.time.format('%H:%M')(new Date(d));
                            }
                        },
                        yAxis: {
                            tickFormat: d3.format('values'),
                            axisLabel: 'Amount of time',
                            axisLabelDistance: -10
                        },

                        forceY: [0, 100],
                        callback: function (chart) {
                            //console.log('!!! lineChart callback !!!');
                        },
                        showYAxis: true,
                        legend: {
                            margin: {
                                top: 5,
                                right: 0,
                                bottom: 20,
                                left: 0
                            }
                        },
                        color: ['#333', '#5bc0de']
                    }
   };


 taskService.get(function(data){
 	
 	data.members.forEach(function(member){
 		var taskLists = new taskFactory()
 		console.log(member);
         taskLists.deSerialize(member);
         $scope.model.taskListsModel.push(taskLists);

    console.log($scope.model.taskListsModel);
 	});
 	  $scope.updatePerformance();

 });



});





// factory to deSerialize data


app.factory("taskFactory",function(){
     var taskListModel = function () {
                this.displayName = '';
                this.id = '';
                this.done = '';
                this.assignedTo = '';
                this.description = '';
                this.efforts = 0;
                this.time = null
                
            };

     taskListModel.prototype.deSerialize = function (data) {
                this.displayName = data.displayName;
                this.id = data.id;
                this.done = data.done;
                this.assignedTo = data.assignedTo;
              
                this.icon = data.icon;
                this.description = data.description;
                this.efforts = data.efforts;
                this.time = data.time
                
            };

           
            // Statics

            return taskListModel;	
});




})(angular);

