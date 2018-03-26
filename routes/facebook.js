// var express = require('express');
// var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;


var express = require('express');
var router = express.Router();
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var querystring = require('querystring');
const User = require('../models/user.js');
const db = require('../models/db');
const { secret,fbclientid,fbclientsecret,fbcallbackurl} = require('../config/config.js');
const { sign, verify, decode } = require('jsonwebtoken');

router.use(passport.initialize());
router.use(passport.session());
// console.log("Strategy",Strategy)

passport.use(new FacebookStrategy({
  "clientID": fbclientid,
  "clientSecret": fbclientsecret,
  "callbackURL": 'https://auth.' + domainkey + '/auth/facebook/callback',
  "scope": [
    "public_profile",
    "email"
  ],
  "profileFields": [
    "id",
    "displayName",
    "first_name",
    "last_name",
    "email",
    "gender",
    "profileUrl",
    "birthday",
    "picture",
    "permissions"
  ]
},

  function (accessToken, refreshToken, profile, cb) {

    // console.log("accessToken",accessToken)
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
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
router.get('/auth/newfacebook', function (req, res, next) {
  console.log("req.session",req.session)
  console.log("req.query['success_url']", req.query['success_url'])
  console.log("req.query['failure_url']", req.query['failure_url'])
  req.session.success_url = req.query['success_url'];
  req.session.failure_url = req.query['failure_url'];
  next()
},
passport.authenticate('facebook'));

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

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/auth/facebook' }),

  async function (req, res) {
    console.log("request========================", req)
    try {
      // console.log('Referrer set to:', req.session.success_url);

      let id = req.user.id
      let fullname = req.user.displayName;
      let firstname = req.user.name.givenName;
      let lastname = req.user.name.familyName;
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
      // console.log("err",err)
        res.redirect(req.session.failure_url + '?err=' + "failed to find any email from your facebook account");
    }
  })

module.exports = router;