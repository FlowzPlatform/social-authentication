let mongoose = require('mongoose');
mongoose.set('debug', true);

const { database, secret } = require('../config/config.js');
mongoose.Promise = global.Promise;

// Logger = require('mongodb').Logger;
// Logger.setLevel('debug');

// mongoose.connect("database",{ /* other options */ });

// var options = {
//     db: {
//         native_parser: true,
//         // readPreference: "secondaryPreferred"
//     },
//     server: {
//         socketOptions: {
//             keepAlive: 1,
//         },
//     },
//     mongos: {
//     //   ssl: true,
//       sslValidate: false
//     },
//     replset: {
//         auto_reconnect: false ,
//         connectWithNoPrimary: true,
//         socketOptions: {
//             keepAlive: 1,
//             connectTimeoutMS: 5000,
//         },
//         strategy: 'ping',
//         // read_secondary: true,
//         // readPreference: 'secondaryPreferred',
//         safe: { w: "majority", j: 1, wtimeout: 10000 }
//     }
// }

mongoose.connect(database)

var db = mongoose.connection;
// console.log("db", db)

db.on('connected', function () {
    console.log("Mongoose default connection is open to ", database);
});

db.on('error', console.error.bind(console, 'connection error:'));

module.exports = mongoose;



























