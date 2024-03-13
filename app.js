//require modules
const express = require('express');
const morgan = require('morgan');
const gameRoutes = require('./routes/gameRoutes');

//setup mongodb connection
//we have to use environment variables (within the .env file) in order to keep our personal access links to the database protected
const { MongoClient } = require('mongodb');
require('dotenv').config();
const uri = process.env.MONGODB_URI;
const ServerApiVersion = '1';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion,
      strict: true,
      deprecationErrors: true,
    }
});

// connect to the MongoDB database
async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);

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