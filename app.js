var express = require('express');
var app = express();
var compression = require('compression');
var helmet = require('helmet');
var path = require('path');

app.use(helmet());
app.use(compression());
 
app.get('/game', function(req, res) {
    res.sendfile(path.join(__dirname, 'index.html'));
});
 
app.listen(3000, () => console.log('Game started successfully!'));
