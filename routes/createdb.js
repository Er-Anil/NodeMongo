var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("myappdb");
  var myobject = { name: "Anil", address: "washypur, Dhanbad", age:22};
  dbo.collection("users").insertOne(myobject, function(err, res){
      if(err) throw err;
      console.log("1 Document inserted");
      db.close();
  });
});