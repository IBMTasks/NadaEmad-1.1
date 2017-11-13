app.controller("ContactActionsController",function ($scope,$http,$location,$rootScope){
	
	
	$scope.addContact = function()
	{
		
		$http.get("/insert_contact", {params:{"_id": $rootScope.loggedEmail,"name": $scope.name, "phone": $scope.phone}})
        .then(function (response) 
        	{

        		if(response.data.insert === "Yes")
			{
				console.log("Yes");
				alert("Account inserted successfully.");
				//$("#name").val("");
	   			//$("#phone").val("");
				return false;
				
			}
			else if(response.data.insert === "No")
			{
				console.log("No");
				alert("Could not insert contact. Please Try Again.");
			}
			else if(response.data.insert === "DB error")
			{
				alert("Database Error. Please Try Again.");
			}

        });
		
		
		
	};
	
	$scope.deleteContact = function()
	{
		
		$http.get("/delete_contact", {params:{"_id": $rootScope.loggedEmail,"name": $scope.name, "phone": $scope.phone}})
        .then(function (response) 
        	{
        		if(response.data.delete === "Yes")
			{
				console.log("Yes");
				alert("Account deleted successfully.");
				return false;
				
			}
			else if(response.data.delete === "No")
			{
				console.log("No");
				alert("Could not remove contact. Please Try Again.");
			}
			else if(response.data.delete === "Null")
			{
				console.log("Contact not found");
				alert("Contact Not found.");
				
			}
			else if(response.data.delete === "DB error")
			{
				alert("Database Error. Please Try Again.");
			}

        });
	};
		
	$scope.updateContact = function()
	{
		
		$http.get("/update_contact", {params:{"_id": $rootScope.loggedEmail,"oldName": $scope.oldName, "oldPhone": $scope.oldPhone, "newName": $scope.newName ,"newPhone": $scope.newPhone}})
        .then(function (response) 
        	{
        		if(response.data.update === "Yes")
			{
				console.log("Yes");
				alert("Account updated successfully.");
				return false;
				
			}
			else if(response.data.update === "No")
			{
				console.log("No");
				alert("Could not update contact. Please Try Again.");
			}
			else if(response.data.update === "Null")
			{
				console.log("Contact not found");
				alert("Contact Not found.");
				
			}
			else if(response.data.update === "DB error")
			{
				alert("Database Error. Please Try Again.");
			}

        });
		
	
	};
	
	
	
	
	

});
