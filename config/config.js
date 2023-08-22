// config/config.js
const mongoose = require('mongoose');

module.exports = {
  apiKey: '1cb51b48cc6d4ca8ae69563cbf7d7819', //needs to be changed according to the apiKey
  database: {
    url: 'mongodb://127.0.0.1/Forex', //this connection needs to be specified based on the local database setting
    connectOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    connect: async () => {
      try {
        await mongoose.connect(module.exports.database.url, module.exports.database.connectOptions);
        console.log('Connected to MongoDB');
      } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit();
      }
    }
  }
};
