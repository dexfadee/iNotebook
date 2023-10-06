const mongoose = require('mongoose');
const mongooseURI = CONNECTION_STRING;

async function connectToMongo() {
  await mongoose.connect(mongooseURI);
  console.log('Connected');
}

module.exports = connectToMongo;