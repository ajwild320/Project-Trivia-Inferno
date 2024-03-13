//require modules
const express = require('express');
const morgan = require('morgan');
const gameRoutes = require('./routes/gameRoutes');
const mongoose = require('mongoose');

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
.catch(err => {
    console.log("Error connecting to MongoDB:", err.message);
    throw new Error("Server not found");
});


//mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('tiny'));

//set up routes
app.get('/', (req, res) => {
    res.render('index');
});
app.use('/game', gameRoutes);