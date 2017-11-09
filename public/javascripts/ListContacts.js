
  angular.module('myApp', [ 'dataGrid','pagination'])
  .controller('tableController', ['$scope', 'myAppFactory', '$filter', function ($scope, myAppFactory, $filter) {

	  
          $scope.gridOptions = {
              data: [],
              urlSync: true
          };

          myAppFactory.getData().then(function (responseData) {
        	  	console.log(responseData);
              $scope.gridOptions.data = responseData;
          });
        

      }])
      .factory('myAppFactory', function ($http) {
    	  	var email = new URLSearchParams(window.location.search).get("_id");
  	    console.log(email);
          return {
              getData: function() 
		      	{
		      		return $http.get("/list_contacts", {params:{"_id": email}})
		              .then(function (response) {
		              	return response.data;
		              });
		      		
		          }
          
          }
      
      });



