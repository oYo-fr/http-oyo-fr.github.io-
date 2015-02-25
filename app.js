var express = require('express');
var app = express();

app.use("/js", express.static(__dirname + '/js'));
app.use("/models", express.static(__dirname + '/models'));
app.use("/sounds", express.static(__dirname + '/sounds'));
app.use("/stylesheets", express.static(__dirname + '/stylesheets'));

app.get('/', function (req, res) { res.sendFile(__dirname + '/index.html'); });

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});