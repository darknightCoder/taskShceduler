'use strict';

function taskService($resource) {

  var resource = $resource('/tasks/all', {}, {

    get: {
      method: 'GET'
    },
    post: {
      method: 'POST'
    }
  });
  return resource;
}

angular.module('taskApp')
  .factory('taskService', ['$resource', taskService]);
