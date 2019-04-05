/****** Configuration *******/

// On charge le framework Express...
var express = require('express');
// On crée l'application web
var app = express();
// On configure Express pour servir les fichiers contenus dans public/
// à l'url /s
app.use('/s', express.static('public'));
app.use(require('body-parser').urlencoded({ extended: false }));
const cookieP = require('cookie-parser');
app.use(cookieP());
let jours = { 'mon' : 'Lundi',
              'tue' : 'Mardi',
              'wed' : 'Mercredi',
              'thu' : 'Jeudi',
              'fri' : 'Vendredi',
              'sat' : 'Samedi',
              'sun' : 'Dimanche' };

/****** Routes *******/

// On définit une route pour l'url /
app.get('/jours', function(req, res) {
   let c="";
  for (var i in jours){c=c+'<br>'+i+' = '+jours[i];}
  c=c+'<br>';
  for (var i in req.headers){c=c+'<br>'+i+' = '+req.headers[i];}

  res.send('bonjour ' +'<br>'+'voici les jours de la semaine'+'<br>'+c);
 
});

// On définit une route qui répond à toute url de la forme /blabla
// en répondant Hello blabla

app.all('/', function(req, res) {
  res.cookie("nom","val");
  
   let c="";
  c=c+'les headers sont <br>';
  for (var i in req.headers){c=c+'<br>'+i+' = '+req.headers[i];}
  c=c+'<br><br>les cookies sont <br>';  
  for (var i in res.cookies){c=c+'<br>'+i+' = '+res.cookies[i];}
  for (var i in req.cookies){c=c+'<br>'+i+' = '+req.cookies[i];}

  //c=c+req.cookies;
  res.send(c);  
 
});

app.get('/query_string', function(req, res) {
     let c="";
  for (var i in req.query){
    c=c+'<br>'+i+' = '+req.query[i];
  }c=c+'<br>';
    for (var i in  req._parsedUrl.query){
    c=c+'<br>'+i+' = '+ req._parsedUrl.query[i];
  }

  res.send(c);
});
     
app.post  ('/form_data', function(req, res) {
     let c="";
  for (var i in req.body){
    c=c+'<br>'+i+' = '+req.body[i];
  }c=c+'<br>'+req.headers;

  res.send(c);
});
     

app.get('/:n', function(req, res) {
    res.send('Hello <b>' + req.params.n + '</b>');
});
/****** *******/



//app.use('/s', express.static('static/form.html'));


// On lance l'application
// (process.env.PORT est un paramètre fourni par Glitch)
app.listen(process.env.PORT);













