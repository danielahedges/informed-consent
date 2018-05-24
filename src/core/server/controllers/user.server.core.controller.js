import mongoose from 'mongoose';
import passport from 'passport';

function getErrorMessage(err) {
  let message = '';

  if (err.code) {
    switch (err.code) {
    case 11000:
    case 11001:
      message = 'Username already exists';
      break;
    default:
      message = 'Something went wrong';
    }
  } else {
    for (var errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }

  return message;
}

var User;

export class UserController {
  static init() {
    User = mongoose.model('User');
  }
  static renderSignIn(req, res) {
    if (!req.user) {
      res.render('signin', {
        title: 'Sign-in Form',
        messages: req.flash('error') || req.flash('info')
      });
    } else {
      return res.redirect('/');
    }
  }
  static renderSignup(req, res) {
    if (!req.user) {
      res.render('signup', {
        title: 'Sign-up Form',
        messages: req.flash('error')
      });
    } else {
      return res.redirect('/');
    }
  }
  static signup(req, res, next) {
    if (!req.user) {
      const user = new User(req.body);
      user.provider = 'local';
      user.save(err => {
        if (err) {
          const message = getErrorMessage(err);
          req.flash('error', message);
          return res.redirect('/signup');
        }
        req.login(user, err => {
          if (err) {
            return next(err);
          }
          return res.redirect('/');
        });
      });
    } else {
      return res.redirect('/');
    }
  }
  static signout(req, res) {
    req.logout();
    res.redirect('/');
  }
}
