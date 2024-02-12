//require modules
const express = require('express');
const morgan = require('morgan');
const gameRoutes = require('./routes/gameRoutes');

//create app
const app = express();

//configure app
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

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

//start server
app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});