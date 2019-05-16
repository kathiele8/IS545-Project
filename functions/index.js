
const functions = require('firebase-functions');
const app = require('./app');

exports.contactApp = functions.https.onRequest(app);

