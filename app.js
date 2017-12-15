var express = require('express');
var app = express();
var compression = require('compression');
var helmet = require('helmet');

app.use(helmet());
app.use(compression());
 
app.get('/', function(req, res) {
    res.sendfile('./index.html');
});
 
app.listen(3000, () => console.log('Game started successfully!'));
