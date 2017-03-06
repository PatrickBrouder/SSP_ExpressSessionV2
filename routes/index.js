var express = require('express');
var router = express.Router();


  
/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.session.myJokes) {
         req.session.myJokes = new Array();
  }
  if (!req.session.jokeCounter) {
         req.session.jokeCounter = 0;
  }
  if (!req.session.pass) {
         req.session.pass = false;
  }
  res.render('index', { title: 'Joke Login' });
});

router.post('/', function(req, res, next) {
  var username =  req.body.username;
  var password = req.body.password;

  username.trim();
  if(username.length ==0 || password.length == 0)
  {
    res.redirect('/');
  }else if(password =='knockknock'){
    req.session.pass=true;
    res.redirect('/jokes');
  } else {
    res.redirect('/');
  }
});

router.post('/jokes', function(req, res, next) {
  var joke = {};
  joke.id= req.session.jokeCounter++;
  joke.joke = req.body.joke;
  req.session.myJokes.push(joke);
  res.redirect('/jokes');

});
router.get('/jokes', function(req, res, next) {
  if(req.session.pass ==false){
    res.redirect('/');
  }
  res.render('jokes',{ jokeList: req.session.myJokes });
});
var test= function(x) { 
    return x.id === jokeID 
}
router.get('/delete/:id', function(req, res, next) {

  var allJokes=req.session.myJokes;
  var jokeID=req.params.id;
  var jokeIndex=allJokes.findIndex(test);
  req.session.myJokes.splice(jokeIndex, 1);
  
  res.redirect('/jokes');
});
module.exports = router;
