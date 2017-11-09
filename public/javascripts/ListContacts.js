
var app = angular.module("myApp", ["ngTable"]);
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
  demoController.$inject = ["$scope" ,"NgTableParams","myService"];

  function demoController($scope ,NgTableParams, myService) {
    var self = this;
    
    
    var mydatapromise = myService.getData();
    mydatapromise.then(function(result){
    	
    	$scope.users = result;
    	console.log($scope.users);
    	if ($scope.users.length > 0)
        {
        	console.log("here");
        	console.log($scope.users);
        	self.tableParams = new NgTableParams({ count: 2 }, { counts: [5, 10, 20], dataset: $scope.users});
            
            self.selectedPageSizes = self.tableParams.settings().counts;
            self.availablePageSizes = [5, 10, 15, 20, 25, 30, 40, 50, 100];
            self.changePage = changePage;
            self.changePageSize = changePageSize;
            self.changePageSizes = changePageSizes;
            
            function changePage(nextPage){
              self.tableParams.page(nextPage);
            }
            
            function changePageSize(newSize){
              self.tableParams.count(newSize);
            }
            
            function changePageSizes(newSizes){
              // ensure that the current page size is one of the options
              if (newSizes.indexOf(self.tableParams.count()) === -1) 
              {
                  newSizes.push(self.tableParams.count());
                  newSizes.sort();
              }
              self.tableParams.settings({ counts: newSizes});
            }
    	}
        
    	
  	});
   
    console.log($scope.users);
    
  }









