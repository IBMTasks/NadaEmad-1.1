app.controller('tableController', ['$scope', 'myAppFactory', '$filter',"$location", "$rootScope" , function ($scope, myAppFactory, $filter, $location, $rootScope) {
		
		
		
          $scope.gridOptions = {
              data: [],
              urlSync: true
          };

          myAppFactory.getData().then(function (responseData) {
        	  	console.log(responseData);
              $scope.gridOptions.data = responseData;
          });
          
          $scope.signOut = function ()
          {
        	  	$rootScope.loggedIn = false;
        	  	$rootScope.loggedEmail= '';
        	  	$location.path("/").search("");

          };
          $scope.reloadGrid = function () {

          }
        

      }])
      .factory('myAppFactory', function ($http,$location,$rootScope) {
    	  
    	  	console.log($location.search()._id);
    	  	var email = $location.search()._id;
  	    console.log(email);
          return {
              getData: function() 
		      	{
		      		return $http.get("/list_contacts", {params:{"_id": $rootScope.loggedEmail}})
		              .then(function (response) {
		              	return response.data;
		              });
		      		
		          }
          
          }
      
      });



