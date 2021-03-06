var express = require('express'),
	app = express(),
	path = require('path'),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	passport = require('passport'),
	mongoose = require('mongoose'),
	http = require('http'),
	flash = require('connect-flash'),
	session = require('express-session'),
	socketio = require('socket.io'),
	cookieParser = require('cookie-parser'),
	nodemailer = require('nodemailer'),
	jwt = require('jsonwebtoken');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(morgan('dev'));

//###################################################################
//Attatch socket.io
//Tutorial : https://vexxhost.com/resources/tutorials/mean-socket-io-integration-tutorial/
//Note : We are simply instantiating socket.io here and attaching our express server with it in the first 2 lines.
//In the next two, we are storing the socket.io and the server instance in our app container.
var server = http.createServer(app);
var io = socketio.listen(server);
app.set('socketio', io);
app.set('server', server);

//###################################################################
//Mongodb connection
var configDB = require('./config/database.js');
mongoose.connect(configDB.url);
app.set('tokenSecret', configDB.tokenSecret);


//###################################################################
//require for passport
//For more info on sessions : https://github.com/expressjs/session#options
app.use(cookieParser());
app.use(session(
	{secret:'ilovelearningfromscotchafterhavingscotch',
	 resave:true,
	 saveUninitialized:false,
	 cookie: { maxAge: 6000000 }
	}
)); //session secret (any random string)

//passing passport obj to be configured
require('./config/passport-local')(passport, app);
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions
app.use(flash());

//setup nodemailer
var transporter = require('./config/nodemailer-transporter')(nodemailer);

//###################################################################
//routes
require('./app/routes/comments')(app);
require('./app/routes/sprint')(app);
require('./app/routes/actions')(app);
require('./app/routes/team')(app);
require('./app/routes/user')(app, passport, transporter);

//###################################################################

app.use(express.static(__dirname +'/public'));
app.use(express.static(__dirname +'/node_modules'));
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname+'/public/index.html'));
});

//app.listen(3000);
app.get('server').listen(8081);
console.log('server started at 8081');
