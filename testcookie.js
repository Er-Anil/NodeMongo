var express = require('express');
var app = express();

app.get('/', function(req,res){
    res.cookie('name','express').send('cookie set');
    res.cookie(name, 'value',{expire:36000 +Date.now()});
    console.log('Cookies: ', req.cookies);
});

app.listen(3001);
console.log("app start at 3001");