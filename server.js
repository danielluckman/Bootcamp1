var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);

  /*
    Your request handler should send listingData in the JSON format as a response if a GET request 
    is sent to the '/listings' path. Otherwise, it should send a 404 error. 
   */
   
   // this sends JSON data if GET request and URL path is found
   if(parsedUrl.pathname == '/listings' && request.method == 'GET')
   {
	   response.writeHead(200, {'Content-Type': 'text/plain'});
	   response.end(listingData);
   }
   
   // Else send the 404 error
   else
   {
	   response.writeHead(404, {'Content-Type': 'text/plain'});
	   response.end("Bad gateway error");	   
   }
};

	fs.readFile('listings.json', 'utf8', function(err, data) {
		/*
		This callback function should save the data in the listingData variable, 
		then start the server. 

		HINT: Check out this resource on fs.readFile
		//https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback

		HINT: Read up on JSON parsing Node.js
		*/

		//Check for errors
		if(err) throw err;

		//Save the data in the listingData variable already defined
		listingData = data;

		//Creates the server
		server = http.createServer(requestHandler);

		//Start the server
		server.listen(port, function() {
			
			//once the server is listening, this callback function is executed
			console.log('Server listening on: http://localhost:' + port);
		});

	}
);
