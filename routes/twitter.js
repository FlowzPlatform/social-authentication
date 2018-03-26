var express = require('express');
var router = express.Router();
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var querystring = require('querystring');
const User = require('../models/user.js');
const db = require('../models/db');
const { secret,twitterclientid,twitterclientsecret,twittercallbackurl } = require('../config/config.js');
const { sign, verify, decode } = require('jsonwebtoken');

router.use(passport.initialize());
router.use(passport.session());

// console.log("Strategy",Strategy)

passport.use(new TwitterStrategy({
    "consumerKey": twitterclientid,
    "consumerSecret": twitterclientsecret,
    "callbackURL": 'https://auth.' + domainkey + '/auth/twitter/callback',
    "userProfileURL"  : 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true',
  },

  function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
  }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/auth/newtwitter', function (req, res, next) {
  console.log("req.session",req.session)
  console.log("req.query['success_url']", req.query['success_url'])
  console.log("req.query['failure_url']", req.query['failure_url'])
  req.session.success_url = req.query['success_url'];
  req.session.failure_url = req.query['failure_url'];
  next()
},
passport.authenticate('twitter'));

async function jwtToken(id) {
  payload = {
    "userId": id,
    "iat": Math.floor(Date.now() / 1000) - 30,
    "exp": Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    "aud": "https://yourdomain.com",
    "iss": "feathers",
    "sub": "anonymous"
  }
  console.log("payload", payload)
  let token = sign(payload, secret);
  console.log("token", token)
  return token;
}

router.get('/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/auth/twitter' }),

  async function (req, res) {
    console.log(" request========================", req)
    try {
      // console.log('Referrer set to:', req.session.success_url);

      let id = req.user.id
      let fullname = req.user.displayName;
      let firstname = null;
      let lastname = null;
      let email = req.user.emails[0].value;
      let provider = req.user.provider


      let data_length = await User.find({ social_uid: id });
      let data = data_length[0];
      // console.log("data",data.length)


      if (data_length.length == 0) {
        let user = new User({ aboutme: null, fullname: fullname, firstname: firstname, lastname: lastname, email: email, password: null, dob: null, role: null, signup_type: null, image_name: null, image_url: null, forget_token_created_at: null, provider: provider, access_token: null, isEmailConfirm: 0, social_uid: id, isActive: 1 });
        let userdata = await user.save()
        console.log("data", data)
        let token = await jwtToken(userdata._id)
        console.log("token:::::::::::", token)
        res.redirect(req.session.success_url + '?token=' + token);
      } else {
        let token = await jwtToken(data._id)
        res.redirect(req.session.success_url + '?token=' + token);
      }
    } catch (err) {
         res.redirect(req.session.failure_url + '?err=' + err);
    }
  })


module.exports = router;