// --------------Twitter API Configuration-------------------------
const Access_Token = '';
const Access_Token_Secret = '';
const consumer_key = '';
const consumer_secret = '';
// --------------------------------------
// ----------------API------------------
var Twit = require('twit');
var T = new Twit({
    consumer_key: consumer_key,
    consumer_secret: consumer_secret,
    access_token: Access_Token,
    access_token_secret: Access_Token_Secret,
    timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
})
// ---------------Environnement-----------------------
var url = require('url');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
var favicon = require('serve-favicon');
// --------------CouchDB--------------------------
var nano = require('nano')('http://localhost:5984');
//---------------------------------------------
var cpt = 0;
var stream = null;
var users = [];

server.listen(3000);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(require('express').static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
    res.render('index');
});
// ---------Test API publish a tweet---------------
app.get('/publish', function (req, res) {
    T.post('statuses/update', { status: 'hello world!' }, function (err, data, response) {
        console.log(data);
        if (err) throw err;
        console.log(data);  // Tweet body.
        console.log(response);  // Raw response object.
        io.sockets.emit('publish', { status: 'ok', name: 'publish' });
    });
});
// --------------create la bdd------------
app.get('/create', function (req, res, next) {
    var params = url.parse(req.url, true).query;
    if ('name' in params) {
        var tmp = params['name'].toString();
        nano.db.destroy(tmp, function (err, body) {
            if (!err) {
                console.log('[info] dataBase ' + tmp + ' deleted.');
                nano.db.create(tmp, function (err, body) {
                    if (!err) {
                        io.sockets.emit('create', { status: 'ok', name: tmp });
                        res.send('database created');
                    }
                });
            }
        });
    }
});

// -----------------socket.io--------------------------------
io.sockets.on('connection', function (socket) {
    // console.log('connect');
    if (users.indexOf(socket.id) === -1) {
        users.push(socket);
    }
    // ----------insertion la donnee-------------
    socket.on('start', function (data) {
        if (stream === null) {
            stream = T.stream('statuses/filter', { track: data.data });
            stream.on('tweet', function (tweet) {
                if (users.length > 0) {
                    cpt++;
                    nano.use('twitter').insert(tweet, function (err, resData) {
                        if (!err) {
                            cpt++;
                            io.sockets.emit('twitter', { text: tweet.text, cpt: cpt });
                            console.log(cpt + " insertion");
                        }
                    });
                } 
            });
        }
    });
    // -----------fermer la flux--------------
    socket.on('stop', function () {
        if (stream !== null) {
            stream.stop();
            stream = null;
            socket.broadcast.emit('stoped', {status:'ok'});
            socket.emit('stoped', {status:'ok'});
        }
    });
    // ------------supprimer le client----------
    socket.on('disconnect', function (o) {
        var index = users.indexOf(socket.id);
        users.splice(index, 1);
    })
});