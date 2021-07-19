const session = require('express-session');
const User = require('../models/User');

exports.logout = function(req, res){
  req.session.destroy(function(){
    res.redirect('/')
  })
}

exports.login = function(req, res){
    let user = new User(req.body)
    user.login().then(function(result){
      req.session.user = {favColor: "blue", username: user.data.username}
      req.session.save(function(){
        res.redirect('/')
      })
    }).catch(function(error){
      req.flash('errors', error)
      req.session.save(function(){
        res.redirect('/')
      })
    })
}

exports.register = function(req, res){
  let user = new User(req.body);
  user.register()
  if(user.errors.length){
    res.send(user.errors)
  }else{
    res.send("Congrats, there are no errors")
  }
}

exports.home = function(req, res){
    if(req.session.user){
      res.render('home-dashboard', {username: req.session.user.username})
    }else{
      res.render('home-guest', {errors: req.flash('errors')})
    }
}