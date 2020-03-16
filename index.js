var express = require('express')
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const { uuid } = require('uuidv4');
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

Sound format:
{
  "wav": {
      "author": "Who send this message.",
      "uri": "Audio path.",
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

function generate_audio(author, uri) {
    return {
        "wav": {
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


app.use(express.static('.'))

io.on('connection', function(socket) {
    var id = uuid();
    console.log(id + ' connected');

    socket.on('disconnect', function() {
        console.log(id + '  disconnected');
    });

    // Welcome message to this client
    //socket.emit('img', generate_image('Server', 'https://i.redd.it/y69fmqpuunc41.jpg'));
    //socket.emit('wav', generate_audio('Server', 'http://www.arilou.org/songs/r/Star%20Wars%20-%20Cantina.mp3'));

    socket.on('txt', function(data) {
        console.log(id + ': ' + data);
        data.txt.author = id;
        socket.broadcast.emit('txt', data);
    });

    socket.on('img', function(data) {
        console.log(id + ': ' + data);
        data.img.author = id;
        socket.broadcast.emit('img', data);
    });

    socket.on('wav', function(data) {
        console.log(id + ': ' + data.wav.author);
        data.wav.author = id;
        socket.broadcast.emit('wav', data);
    });
});

http.listen(port, function() {
    console.log('listening on port *:' + port);
});