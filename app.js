//require modules
const express = require('express');
const morgan = require('morgan');
const gameRoutes = require('./routes/gameRoutes');
const userRoutes = require('./routes/userRoutes');
const mainRoutes = require('./routes/mainRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const flash = require('connect-flash');

//create app
const app = express();

//configure app
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');
require('dotenv').config();
const uri = process.env.MONGODB_URI;

// connect to mongodb atlas database
mongoose.connect(uri, {
})
.then(() => {
    console.log('Connected to MongoDB');
    // start the server
    app.listen(port, host, () => {
    console.log('Server is running on port', port);
    });
})
.catch(err=>console.log(err.message));

// creating the session middleware
app.use(
    session({
        secret: "swordOfBaal",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: uri }), // Provide the MongoDB URI here
        cookie: { maxAge: 60*60*1000 }
    })
);


// setting the flash middleware
app.use(flash());

app.use((req, res, next) => {
    //console.log(req.session);
    res.locals.user = req.session.user||null;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
});

//mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('dev'));
app.use(methodOverride('_method'));

// set up routes
app.get('/', (req, res) => {
    res.render('index');
});

//mount routes
app.use('/', mainRoutes);
app.use('/users', userRoutes);
app.use('/game', gameRoutes);
app.use('/', leaderboardRoutes);


// Error Handling
app.use((req, res, next) => {
    let err = new Error('Server Failed to Locate ' + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    if(!err.status) {
        err.status = 500;
        err.message = ('Internal Server Error');
    }

    res.status(err.status);
    res.render('error', { error: err, title: 'Error'});
});