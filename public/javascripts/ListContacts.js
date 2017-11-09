
var app = angular.module("myApp", ["dataGrid","pagination"]);
app.factory('myService',function($http){
	
	var email = new URLSearchParams(window.location.search).get("_id");
    console.log(email);
    
	var getData = function() 
	{
		return $http.get("/list_contacts", {params:{"_id": email}})
        .then(function (response) {
        	return response.data;
        });
		
    };


    return { getData: getData };
	
	
});
 
 
  app.controller("tableController", demoController);
  demoController.$inject = ["$scope","myService"];

  function demoController($scope, myService) {
    var self = this;
    
    
    var mydatapromise = myService.getData();
    mydatapromise.then(function(result){
    	
    	$scope.gridOptions = {
    			data: result,
    			sort:
			{
    				predicate: 'name',
    				direction: 'asc'
			}
    			
    	};
    	
  	});
   
    console.log($scope.users);
    
  }









