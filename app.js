var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Cloudant = require('cloudant');
var request = require('request');
var index = require('./routes/index.js');
var users = require('./routes/users.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);


var path = require('path')


var username = "369c0112-629b-4e5b-a77b-2eaa86b2e262-bluemix";
var password = "d96783e0c00a3c037857ec562f3572aa18f49ad700de309c3860872a9a3ecc05";

var cloudant_url = "https://369c0112-629b-4e5b-a77b-2eaa86b2e262-bluemix:d96783e0c00a3c037857ec562f3572aa18f49ad700de309c3860872a9a3ecc05@369c0112-629b-4e5b-a77b-2eaa86b2e262-bluemix.cloudant.com";

var cloudant = Cloudant({account:username, password:password});

var dbname = 'users';
var db = cloudant.db.use(dbname);


app.get('/add_user',function(req, res)
{ 
	var url = cloudant_url + "/users/_design/users/_view/users";
	var email_string;
	request({
			 url: url,
			 json: true
			}, function (error, response, body) {
				if (!error && response.statusCode === 200)
				{
					db.insert(req.query, function(err, data){
					if (!err)
					{
						console.log("Added new name");
						email_string="{\"added\":\"Yes\"}";
						res.contentType('application/json'); //res.contentType and res.send is added inside every block as code returns immediately
						res.send(JSON.parse(email_string));
					}
					else
					{
						console.log("Error inserting into DB " + err);
						email_string="{\"added\":\"DB insert error\"}";
						res.contentType('application/json');
						res.send(JSON.parse(email_string));

					}
				});
				  
				}
				else
				{
					console.log("No data from URL. Response : " + response.statusCode);
					email_string="{\"added\":\"DB error\"}";
					res.contentType('application/json');
					res.send(JSON.parse(email_string));
				}
	});
});

app.get('/login_user',function(req, res)
{ 
	var url = cloudant_url + "/users/_design/users/_view/users";
	var user_exists = 0;
	var respond;
	request({
			 url: url,
			 json: true
			}, function (error, response, body) {
				if (!error && response.statusCode === 200)
				{
					
					db.find({selector:{_id: req.query._id}}, function(er, result) 
					{
						
						if (er) 
						{
						    console.log("Error");
						}
				   		if (result.docs.length == 1) 
					    {
						  	password = result.docs[0].password;
						  	user_exists = 1;
						}
						
						if ((user_exists == 1) && (password.trim() == req.query.password.trim()))
						{
							console.log("User exists, loginning in");
							respond="{\"login\":\"Yes\"}";
							var contactsDB = "contacts";
							cloudant.db.use(contactsDB).insert({_id: req.query._id.trim(), contactsList:[]}, function(err, data)
							{
								if (!err)
								{
									console.log("Added new contact list");
								}
								else
								{
									console.log("Failed to add new contact list or contact list already exist");
									
								}
							});

							res.contentType('application/json');
							res.send(JSON.parse(respond));
							
						}
						else if(user_exists == 1 && password.trim() != req.query.password.trim())
						{
							console.log("Wrong password");
							respond="{\"login\":\"Wrong password\"}";
							res.contentType('application/json');
							res.send(JSON.parse(respond));
						}
						else
						{
							console.log("User not exist, Signup here");
							respond="{\"login\":\"No\"}";
							res.contentType('application/json');
							res.send(JSON.parse(respond));

						}
					});
					
					
				  
				}
				else
				{
					console.log("No data from URL. Response : " + response.statusCode);
					respond="{\"login\":\"DB read error\"}";
					res.contentType('application/json');
					res.send(JSON.parse(respond));
				}
	});
});


app.get('/list_contacts',function(req, res)
{ 
	console.log("called");
	var url = cloudant_url + "/contacts/_design/contacts/_view/contacts";
	var respond;
	var contactsDB = "contacts";
	request({
			 url: url,
			 json: true
			}, function (error, response, body) {
				if (!error && response.statusCode === 200)
				{
					console.log(req.query._id);
					cloudant.db.use(contactsDB).find({selector:{_id: req.query._id}}, function(er, result) 
					{
						if (er) 
						{
						    console.log("Error");
						}
				   		if (result.docs.length == 1) 
					    {
				   			console.log("done");
				   			console.log(result.docs[0].contactsList);
						  	res.contentType('application/json');
							res.send(result.docs[0].contactsList);
						}
						
					});
				}
				else
				{
					console.log("No data from URL");
					console.log("Response is : " + response.statusCode);
					var error_string="{\"error\":\"DB read error\"}"; //Send error message in case 'request' can't read database
					res.contentType('application/json');
					res.send(JSON.parse(error_string));
				}
				
	});
});

app.get('/delete_contact',function(req, res)
{ 
	var url = cloudant_url + "/contacts/_design/contacts/_view/contacts";
	var respond;
	var contactsDB = "contacts";
	var indexToBeDeleted = -1;
	var newArray=[];
	var rev;
	request({
			 url: url,
			 json: true
			}, function (error, response, body) {
				if (!error && response.statusCode === 200)
				{
					cloudant.db.use(contactsDB).find({selector:{_id: req.query._id}}, function(er, result) 
					{
						if (er) 
						{
						    var error_string="{\"delete\":\"DB error\"}"; //Send error message in case 'request' can't read database
							res.contentType('application/json');
							res.send(JSON.parse(error_string));
						}
				   		if (result.docs.length == 1) 
					    {
					    	rev = result.docs[0]._rev;
							for (var i = 0; i < result.docs[0].contactsList.length ; i++)
							{
								if ((result.docs[0].contactsList[i].name == req.query.name) && (result.docs[0].contactsList[i].phone ==req.query.phone)) 
								{
									indexToBeDeleted = i;
									continue;
								}
								else
								{
									newArray.push(result.docs[0].contactsList[i]);
								}
							}
							if (indexToBeDeleted == -1) 
							{
								console.log("Contact not exist");
								respond="{\"delete\":\"Null\"}";
								res.contentType('application/json');
								res.send(JSON.parse(respond));
							}
							else
							{
								cloudant.db.use(contactsDB).insert({ _id: req.query._id, _rev: rev, contactsList: newArray }, function(err, body) 
								{
								  if (!err)
								  {		
								  	console.log("Contact deleted successfully");
									respond="{\"delete\":\"Yes\"}";
									res.contentType('application/json');
									res.send(JSON.parse(respond));

								  }
								  else
								  {
								  	console.log("Contact not deleted successfully");
									respond="{\"delete\":\"No\"}";
									res.contentType('application/json');
									res.send(JSON.parse(respond));

								  }
								});
							}
						}
						
					});
					
				}
				else
				{
					console.log("No data from URL");
					console.log("Response is : " + response.statusCode);
					var error_string="{\"delete\":\"DB error\"}"; //Send error message in case 'request' can't read database
					res.contentType('application/json');
					res.send(JSON.parse(error_string));
				}
				
	});
});

app.get('/update_contact',function(req, res)
{ 
	var url = cloudant_url + "/contacts/_design/contacts/_view/contacts";
	var respond;
	var contactsDB = "contacts";
	var indexToBeUpdated = -1 ;
	var rev;
	var newArray;
	request({
			 url: url,
			 json: true
			}, function (error, response, body) {
				if (!error && response.statusCode === 200)
				{
					cloudant.db.use(contactsDB).find({selector:{_id: req.query._id}}, function(er, result) 
					{
						if (er) 
						{
						    var error_string="{\"update\":\"DB error\"}"; //Send error message in case 'request' can't read database
							res.contentType('application/json');
							res.send(JSON.parse(error_string));
						}
				   		if (result.docs.length == 1) 
					    {
					    	rev = result.docs[0]._rev;
							for (var i = 0; i < result.docs[0].contactsList.length ; i++)
							{
								if (result.docs[0].contactsList[i].name ==req.query.oldName && result.docs[0].contactsList[i].phone ==req.query.oldPhone) 
								{
									result.docs[0].contactsList[i].name =req.query.newName;
									result.docs[0].contactsList[i].phone =req.query.newPhone;
									indexToBeUpdated = i;
									newArray = result.docs[0].contactsList;
									break;
								}
							}
							if (indexToBeUpdated == -1) 
							{
								console.log("Contact not exist");
								respond="{\"update\":\"Null\"}";
								res.contentType('application/json');
								res.send(JSON.parse(respond));
							}
							else
							{
								cloudant.db.use(contactsDB).insert({ _id: req.query._id, _rev: rev, contactsList: newArray }, function(err, body) 
								{
								  if (!err)
								  {		
								  	console.log("Contact updated successfully");
									respond="{\"update\":\"Yes\"}";
									res.contentType('application/json');
									res.send(JSON.parse(respond));

								  }
								  else
								  {
								  	console.log("Contact not updated successfully");
									respond="{\"update\":\"No\"}";
									res.contentType('application/json');
									res.send(JSON.parse(respond));

								  }
								});
							}


						}
						
					});
				}
				else
				{
					console.log("No data from URL");
					console.log("Response is : " + response);
					var error_string="{\"update\":\"DB error\"}"; //Send error message in case 'request' can't read database
					res.contentType('application/json');
					res.send(JSON.parse(error_string));
				}
				
	});
});

app.get('/insert_contact',function(req, res)
{ 
	var url = cloudant_url + "/contacts/_design/contacts/_view/contacts";
	var respond;
	var contactsDB = "contacts";
	var indexToBeUpdated = -1 ;
	var rev;
	var newArray;
	request({
			 url: url,
			 json: true
			}, function (error, response, body) {
				if (!error && response.statusCode === 200)
				{
					cloudant.db.use(contactsDB).find({selector:{_id: req.query._id}}, function(er, result) 
					{
						if (er) 
						{
						    var error_string="{\"insert\":\"DB error\"}"; //Send error message in case 'request' can't read database
							res.contentType('application/json');
							res.send(JSON.parse(error_string));
						}
				   		if (result.docs.length == 1) 
					    {
					    	rev = result.docs[0]._rev;
					    	var newContact = "{\"name\":\""+req.query.name+"\",\"phone\":\""+req.query.phone+"\"}";
					    	console.log(newContact);
					    	result.docs[0].contactsList.push(JSON.parse(newContact));
							cloudant.db.use(contactsDB).insert({ _id: req.query._id, _rev: rev, contactsList: result.docs[0].contactsList }, function(err, body) 
							{
							  if (!err)
							  {		
							  	console.log("Contact inserted successfully");
								respond="{\"insert\":\"Yes\"}";
								res.contentType('application/json');
								res.send(JSON.parse(respond));

							  }
							  else
							  {
							  	console.log("Contact not inserted successfully");
								respond="{\"insert\":\"No\"}";
								res.contentType('application/json');
								res.send(JSON.parse(respond));

							  }
							});
							


						}
						
					});
				}
				else
				{
					console.log("No data from URL");
					console.log("Response is : " + response);
					var error_string="{\"insert\":\"DB error\"}"; //Send error message in case 'request' can't read database
					res.contentType('application/json');
					res.send(JSON.parse(error_string));
				}
				
	});
});










// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
