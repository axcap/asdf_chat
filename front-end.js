var id;
var socket = io();

function send_audio(e) {
    e.preventDefault();
    data = {
        "wav": {
            "author": "Me",
            "uri": "http://www.arilou.org/songs/r/Star%20Wars%20-%20Cantina.mp3",
        },
    };
    $('#messages').append($('<li class="no-bubble message-out"> <audio controls> <source src=' + data.wav.uri + ' type="audio/ogg"> Your browser does not support the audio element. </audio></li>'));
    socket.emit('wav', data);
    return false
}

function send_image(e) {
    e.preventDefault();
    data = {
        "img": {
            "author": "Who send this message.",
            "uri": "https://i.imgur.com/etjgJ2D.jpg",
        },
    };
    $('#messages').append($('<li class="no-bubble message-out"> <img src="' + data.img.uri + '" width="320" height="240"> </li>'));
    socket.emit('img', data);
    return false
}

function send_text(e) {
    e.preventDefault();
    var txt = document.getElementById("msg").value;
    data = {
        "txt": {
            "author": id,
            "message": txt,
        },
    };
    console.log(data.txt.message);
    $('#messages').append($('<li class="message-out">' + data.txt.message + '</li>'));
    socket.emit('txt', data);
    document.getElementById("msg").value = '';
    return false
}

$(function() {

    socket.on('txt', function(data) {
        console.log(data);
        console.log(data.txt.author);
        console.log(id);
        if (data.txt.author != id) {
            $('#messages').append($('<li class=" message-in">').text(data.txt.message));
        }
    });

    socket.on('img', function(data) {
        $('#messages').append($('<li class="no-bubble message-in"> <img src="' + data.img.uri + '" width="320" height="240"> </li>'));
    });

    socket.on('wav', function(data) {
        console.log("audio in");
        $('#messages').append($('<li class="no-bubble message-in"> <audio controls> <source src=' + data.wav.uri + ' type="audio/ogg"> Your browser does not support the audio element. </audio></li>'));
    });
});