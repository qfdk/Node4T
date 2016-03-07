/**
 * Created by qfdk on 16/3/2.
 */
var socket = io.connect('http://localhost:3000');
socket.on('stoped', function(data) {
    if (data.status === 'ok') {
        $("#tab tr:eq(0)").after('<tr class="warning"><td>[Information]</td><td> Work stopted.</td></tr>');
    }
});

socket.on('twitter', function(data) {
    $("#tab tr:eq(0)").after('<tr><td>' + data.cpt + '</td><td>' + data.text + '</td></tr>');
});


socket.on('create', function(data) {
    if (data.status === 'ok') {
        $("#tab tr:eq(0)").after('<tr class="info"><td>[Information]</td><td> Database created.</td></tr>');
    }
});


$('.btn-success').click(function() {
    $("#tab tr:eq(0)").after('<tr class="info"><td>[Information]</td><td> Work started.</td></tr>');
    socket.emit('start', { data: $('.form-control').val() });
    // $(this).attr('disabled','disabled');
});

$('.btn-danger').on('click', function() {
    // $('.btn-success').attr('disabled','active');
    socket.emit('stop', { data: 'stop' });
});