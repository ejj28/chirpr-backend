var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var express = require("express");
var app = express();
var bodyParser = require('body-parser')
var cors = require('cors')

app.use(bodyParser.json());
app.use(cors());



var database;



MongoClient.connect(url, function (err, db) {
	if (err) throw err;
	database = db.db("chirp1");

});



app.post("/newChirp", function (req, res) {
	var chirpObject = { "user": req.body.user, "body": req.body.message };
	database.collection("chirps").insertOne(chirpObject, function (err, res) {
		if (err) throw err;
		console.log("Added to database");
	});
	console.log(req.body);
	res.end();
});

app.get("/getChirps", (req, res, next) => {
	database.collection("chirps").find({}).toArray(function(err, result) {
		if (err) throw err;
		res.json(result);
		
	  });
	
});



app.listen(3000, () => {
	console.log("Server running on port 3000");
});

process.on('exit', function () {
	database.close();
});
