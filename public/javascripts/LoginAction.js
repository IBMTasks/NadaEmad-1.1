app.controller("loginController",function ($scope,$http,$location,$rootScope){
	
	$scope.checkLogin = function()
	{
		
		$http.get("/login_user", {params:{"_id": $scope.email,"password": $scope.password}})
        .then(function (response) 
        	{
        		if(response.data.login == "Yes")
    			{
        			console.log("Yes");
        			$location.path("/Contacts").search('_id',$scope.email);
        			$rootScope.loggedIn = true;
        			$rootScope.loggedEmail= $scope.email;
        			console.log($rootScope.loggedIn);
				return false;
    			}
        		else if(data.login === "No")
			{
				console.log("No");
				alert("You have to signup.");
			}
			else if(data.login === "Wrong password")
			{
				console.log("Wrong password");
				alert("Incorrect password, Try again.");
				
			}
			else if(data.login === "DB read error")
			{
				console.log("DB read error");
				alert("Could not read database, Try again.");
			}
        });
		
		
		
	}
	
	
	

});


