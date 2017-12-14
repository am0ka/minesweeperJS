var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.send('Birds home page');
  function cout() {
  	console.log('Time: ', Date.now());
  }
});

module.exports = router;