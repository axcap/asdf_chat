var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const {uuid} = require('uuidv4');
const port = 6969;


/*
Message format:
{
  "txt": {
      "author": "Who send this message.",
      "message": "Message body.",
  },
}

Image format:
{
  "img": {
      "author": "Who send this message.",
      "uri": "Image path.",
  },
}
*/

function generate_image(author, uri) {
    return {
        "img": {
            "author": author,
            "uri": uri,
        },
      }
  }

function generate_message(author, message) {
    return {
        "txt": {
            "author": author,
            "message": message,
        },
      }
  }


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
app.get('/style.css', function(req, res){
    res.sendFile(__dirname + '/style.css');
});

io.on('connection', function(socket){
    var id = uuid();
    console.log(id+' connected');

    socket.on('disconnect', function(){
        console.log(id+'  disconnected');
    });

    // Welcome message to this client
    socket.emit('img', generate_image('Server', 'https://i.redd.it/y69fmqpuunc41.jpg'));

    socket.on('txt', function(msg){
        console.log(id+': '+msg);
        socket.broadcast.emit('txt', generate_message(id, msg));
    });
});

http.listen(port, function(){
    console.log('listening on port *:'+port);
});
