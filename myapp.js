

var http = require('http');
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var destroy = require('destroy');

//var createdb = require('./routes/createdb');
//var createdb = require('./routes/multipleinsert');
var app = express();



app.set('view engine', 'ejs');

app.use(cookieParser());
app.use (session({
    secret: 'secretkey',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



function isAuthenticated(req, res, next) {

    console.log("autheticatied called");
    if (req.session.user){
        console.log("****************");
        return next();
    }else {
        var err = new Error("Not logged in!");
        console.log(req.session.user);
        next(err);
       
     }
  
    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
    
  }
  

var Users=[];

var user={};


app.get('/admin', isAuthenticated,function(req,res){
    console.log("after authication called");
    if(req.session.user){
        res.write('<h1>Hello '+user.email+'</h1>');
        
    }
    else{
       // res.write('please login first');
       res.render('pages/login');
    }
});

app.get('/protected_page', isAuthenticated, function(req, res){
    console.log(Users);
    res.render('pages/protected_page', {email: req.session.user.email})
 });

app.get('/signup', function (req, res) {
    res.render('pages/registration');
});

app.get('/login', function (req, res) {
    res.render('pages/login');
});

///////////////////////////////////

//////////////////////////////////////


app.post('/signup', function(req,res){
MongoClient.connect(url, function(err, db) {
 if(!req.body.email || !req.body.password){
     res.status("400");
     res.send("Invalid details");
 }
 else {
     Users.filter(function(user){
         if(user.email === req.body.email){
             res.render('pages/registration', { message: "User already exists! choose another email id "});

         }
     });
     var newUser={email: req.body.email,password:req.body.password};
     Users.push(newUser);
     req.session.user = newUser;
     res.redirect('/protected_page');
 }
      var dbo = db.db("myappdb");
      var newuser = { email: req.body.email, name : req.body.name ,password:req.body.password, age: req.body.age
    };
    
      
      dbo.collection("users").insertOne(newuser, function(err, res){
          if(err) throw err;
          db.close();
          
      });
  
});
    res.send("Register sucessfully");
});

app.post('/login', function(req,res){
  
    MongoClient.connect(url, function(err, db){
        
       
        if(err) {throw err;}
      else{  var dbo = db.db("myappdb");
        var query = { email: req.body.email, password: req.body.password };
       
        dbo.collection("users").find(query).toArray(function(err, result) {
            if (err) throw err;
           
           if(result.length){
            // console.log(result);
            user['email']= req.body.email;
            user['password']= req.body.password;
            res.send("Logged In Success!");
           }
           else{

            res.send("Invalid user");
           }
           req.session.user=user;
           console.log(user);
            db.close();
        });
    }
    });
    
});


app.get('/logout', function(req, res){
    req.session.destroy(function(){
       console.log("user logged out.")
    });
    
    res.redirect('/login');
 });
 /////////////////////////////




// app.get('/logout',function(req,res){
//     res.session.destroy(function(err){
//         if(err) {
//             console.log(err);
//         } else {
//             res.redirect('/');
//         }
//     });
// });




app.listen(4001);
console.log("server active at:- localhost:4001");
