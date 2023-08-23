const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/login', (req, res) => {
  // Authenticate user (replace with your logic)
  const user = { id: 1, username: 'exampleUser' };

  // Create a JWT
  const token = jwt.sign(user, 'your-secret-key');

  res.json({ token });
});

module.exports = router;
