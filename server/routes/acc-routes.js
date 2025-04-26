const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/logged-in');
const {updatePassword} = require('../controllers/acc-controllers');

router.put('/update-password', isLoggedIn, updatePassword);

module.exports = router;