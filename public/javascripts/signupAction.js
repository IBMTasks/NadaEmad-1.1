$(document).ready(function(){

$("#add_user_button").click(function(e){
			e.preventDefault();
			
			$.ajax({
				url: "/add_user",
				type: "GET",
				dataType: "json",
				data:{_id: $("#email").val(),password: $("#password").val()},
				contentType: "application/json",
				cache: true,
				timeout: 5000,
				complete: function() {
				  console.log('process complete');
				},
				success: function(data) {
				
					if(data.added === "Yes")
					{
						console.log("Yes");
						alert("Account created successfully, You can login now.");
						window.location = "/";
						return false;
					}
					else if(data.added === "DB insert error")
					{
						alert("User already exists, You can login directly.");
						window.location = "/";
						return false;
					}
					else if(data.added === "DB error")
					{
						console.log("DB read error");
						alert("Database Error, Try again.");
					}
		   			$("#email").val("");
		   			$("#password").val("");
		   			$("#cPassword").val("");

				},
				error: function() {
				  console.log('process error');
				},
			});
	});





});



