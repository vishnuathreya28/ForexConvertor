const express = require('express');
const authenticateToken = require('../middleware/authenticateToken'); // Path to your middleware
const router = express.Router();

router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected route', user: req.user });
});

module.exports = router;
