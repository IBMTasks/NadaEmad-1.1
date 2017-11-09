$(document).ready(function(){

$("#login_user_button").click(function(e){
			e.preventDefault();
			
			$.ajax({
				url: "/login_user",
				type: "GET",
				dataType: "json",
				data:{_id: $("#email").val(),password: $("#password").val()},
				contentType: "application/json",
				cache: true,
				timeout: 7000,
				complete: function() {
				  console.log('process complete');
				},
				success: function(data) {
					
					if(data.login === "Yes")
					{
						console.log("Yes");
						window.location.href = "/Contacts.html?_id="+$("#email").val();
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

				},
				error: function() {
				  console.log('process error');
				},
			});
	});





});



