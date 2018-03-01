var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("myappdb");
  var myobject = [{ name: "Anil", address: "washypur, Dhanbad"},
  { name: 'John', address: 'Highway 71'},
  { name: 'Peter', address: 'Lowstreet 4'},
  { name: 'John', address: 'Highway 71'},
  { name: 'Peter', address: 'Lowstreet 4'},
  { name: 'John', address: 'Highway 71'},
  { name: 'Peter', address: 'Lowstreet 4'}

];
  dbo.collection("users").insertMany(myobject, function(err, res){
      if(err) throw err;
      console.log("No of Document inserted " +res.insertedCount);
      db.close();
  });
});