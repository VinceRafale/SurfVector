var mongoose = require('mongoose/');
var config = require('./config'); // Local congig file to hide creds
db = mongoose.connect(config.creds.mongoose_auth),
Schema = mongoose.Schema;  

// require restify and bodyParser to read Backbone.js syncs
var restify = require('restify');  
var server = restify.createServer();
server.use(restify.bodyParser());

//Look up each and every instance of the parser.

//create a sample scheme for the markers

var MarkerSchema = new Schema({
  name: String,
  lastUpdated: Date
});
// Use the schema to register a model with MongoDb
mongoose.model('Marker', MarkerSchema); 
var Marker = mongoose.model('Marker'); 

//This works, remove doesn't work. 
// Marker.remove(function (err) {

// });

// var parser = require('parser');
var parser = require('./parser');

// parser.hi('there');

 
//Load the final product in the 

// for (var i = 0; i <10; i++) {
// 	var title = 'Marker Location:' + i;
// 	var marker = new Marker({name: title,
// 							lastUpdated:new Date()});

// 	marker.save(function (err) {
//   		if (!err) {
//   			console.log('Success');
//   			marker.push({
//   				title: 'A different title' + title
//   			}) 
//   			console.log(marker); 
//   		}
//   		else {
//   			console.log('Faliure!'); 
//   		} 
// 	}); 
// };
function getMarkers(req, res, next) {
  // Resitify currently has a bug which doesn't allow you to set default headers
  // This headers comply with CORS and allow us to server our response to any origin
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // .find() without any arguments, will return all results
  // the `-1` in .sort() means descending order
  Marker.find().sort('date', -1).execFind(function (arr,data) {
    res.send(data);
  });
}

server.get('/markers', getMarkers);

server.listen(8080, function() {
  // console.log('%s listening at %s, BOOM', server.name, server.url);
});