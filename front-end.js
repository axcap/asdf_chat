$(function () {
    var socket = io();
    $('form').submit(function (e) {
        e.preventDefault(); // prevents page reloading
        socket.emit('txt', $('#m').val());
        $('#messages').append($('<li class=" message-out">').text($('#m').val()));
        $('#m').val('').focus();
        return false;
    });
    socket.on('txt', function (msg) {
        $('#messages').append($('<li class=" message-in">').text(msg.txt.message));
    });

    socket.on('img', function (msg) {
        $('#messages').append($('<li class="no-bubble message-in"> <img src="' + msg.img.uri + '" width="320" height="240"> </li>'));
    });

    socket.on('wav', function (msg) {
        $('#messages').append($('<li class="no-bubble message-in"> <audio controls> <source src=' + msg.wav.uri + ' type="audio/ogg"> Your browser does not support the audio element. </audio></li>'));
    });
});