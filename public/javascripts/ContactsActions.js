$(document).ready(function(){




$("#delete_contact_button").click(function(e){
			e.preventDefault();
			
			$.ajax({
				url: "/delete_contact",
				type: "GET",
				dataType: "json",
				data:{_id: document.getElementById("email").innerHTML,name: $("#name").val(),phone: $("#phone").val()},
				contentType: "application/json",
				cache: true,
				timeout: 7000,
				complete: function() {
				  console.log('process complete');
				},
				success: function(data) {
					
					if(data.delete === "Yes")
					{
						console.log("Yes");
						alert("Account deleted successfully.");
						window.location.href = "/Contacts.html?_id="+new URLSearchParams(window.location.search).get("_id");
						return false;
						
					}
					else if(data.delete === "No")
					{
						console.log("No");
						alert("Could not remove contact. Please Try Again.");
					}
					else if(data.delete === "Null")
					{
						console.log("Contact not found");
						alert("Contact Not found.");
						
					}
					else if(data.delete === "DB error")
					{
						alert("Database Error. Please Try Again.");
					}

				},
				error: function() {
				  console.log('process error');
				},
				
			});
	});

$("#update_contact_button").click(function(e){
			e.preventDefault();
			
			$.ajax({
				url: "/update_contact",
				type: "GET",
				dataType: "json",
				data:{_id: document.getElementById("email").innerHTML,oldName: $("#oldName").val(),oldPhone: $("#oldPhone").val(),newName: $("#newName").val(),newPhone: $("#newPhone").val()},
				contentType: "application/json",
				cache: true,
				timeout: 7000,
				complete: function() {
				  console.log('process complete');
				},
				success: function(data) {
					
					if(data.update === "Yes")
					{
						console.log("Yes");
						alert("Account updated successfully.");
						window.location.href = "/Contacts.html?_id="+new URLSearchParams(window.location.search).get("_id");
						return false;
						
					}
					else if(data.update === "No")
					{
						console.log("No");
						alert("Could not update contact. Please Try Again.");
					}
					else if(data.update === "Null")
					{
						console.log("Contact not found");
						alert("Contact Not found.");
						
					}
					else if(data.update === "DB error")
					{
						alert("Database Error. Please Try Again.");
					}

				},
				error: function() {
				  console.log('process error');
				},
				
			});
	});

$("#insert_contact_button").click(function(e){
			e.preventDefault();
			
			$.ajax({
				url: "/insert_contact",
				type: "GET",
				dataType: "json",
				data:{_id: document.getElementById("email").innerHTML,name: $("#name").val(),phone: $("#phone").val()},				
				contentType: "application/json",
				cache: true,
				timeout: 7000,
				complete: function() {
				  console.log('process complete');
				},
				success: function(data) {
					
					if(data.insert === "Yes")
					{
						console.log("Yes");
						alert("Account inserted successfully.");
						window.location.href = "/Contacts.html?_id="+new URLSearchParams(window.location.search).get("_id");
						return false;
						
					}
					else if(data.insert === "No")
					{
						console.log("No");
						alert("Could not insert contact. Please Try Again.");
					}
					else if(data.insert === "DB error")
					{
						alert("Database Error. Please Try Again.");
					}

				},
				error: function() {
				  console.log('process error');
				},
				
			});
	});





});



