const express = require('express');
const bodyParser = require('body-parser');
const conversionRoutes = require('./routes/conversionRoutes');
const config = require('./config/config'); // Import your config

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB using the configuration from config.js
config.database.connect();

app.use(bodyParser.json());

// Routes
app.use('/conversion', conversionRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
