// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model(
  'User',
  new Schema({username:String,aboutme:String,fullname:String,firstname:String,lastname:String,middlename:String,companyname:String,email:String,password:String,address1:String,address2:String,country:String,state:String,city:String,zipcode:String,phonenumber:String,fax:String,dob:Date,role:String,signup_type:String,
    image_name:String,image_url:String,created_at:{type : Date,default : Date.now},updated_at:{type : Date,
   default : Date.now},forget_token:String,forget_token_created_at:{type : Date,
  default : Date.now},provider: String,access_token:String,picture:String,social_uid:String,isEmailConfirm:String,application_type:String,isActive:String},{strict: false}),
  'User'
);