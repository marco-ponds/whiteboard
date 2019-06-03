var express = require('express');
var server = express();
var http = require('http').Server(server);
var io = require('socket.io')(http);
const morgan = require('morgan');
const fileupload = require('express-fileupload');
const bodyParser = require('body-parser');

const ServerController= require('./serverController');
const SocketController = require('./SocketController');

server.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
server.use(bodyParser.json({ limit: '100mb', extended: true }));
server.use(fileupload({ limits: { fileSize: 50 * 1024 * 1024 } }));
server.use(morgan('dev'));
server.use(express.static('public'));

server.post('/api/image', ServerController.uploadImage);
server.get('/api/image', ServerController.getSingleImage);
server.get("/", ServerController.sendIndexHtml);

SocketController.start(io);

http.listen(process.env.PORT, function(){
  console.log('listening on *:' + process.env.PORT);
});