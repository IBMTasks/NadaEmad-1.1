app.controller("signupController",function ($scope,$http,$location,$rootScope){
	
	$scope.signup = function()
	{
		
		$http.get("/add_user", {params:{"_id": $scope.email,"password": $scope.password}})
        .then(function (response) 
        	{

			if(response.data.added === "Yes")
			{
				console.log("Yes");
				alert("Account created successfully, You can login now.");
				$location.path("/Login");
				$rootScope.signedUp = true;
				return false;
			}
			else if(response.data.added === "DB insert error")
			{
				alert("User already exists, You can login directly.");
				$location.path("/Login");
				return false;
			}
			else if(response.data.added === "DB error")
			{
				console.log("DB read error");
				alert("Database Error, Try again.");
			}
   			$("#email").val("");
   			$("#password").val("");
   			$("#cPassword").val("");

        });
		
		
		
	}
	
	
	

});

