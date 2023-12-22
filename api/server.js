const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const playerRouter = require('./routes/player-router');

//use
const app = express();

//connect mongodb
const connectToMongoDB = async () => {
  try {
    await mongoose.connect('mongodb://database:27017/score', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Add retry logic or handle the error appropriately
  }
};

mongoose.Promise = global.Promise;

//static files
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

//route
app.use('/api',playerRouter);

// error handling middleware
app.use(function(err,req,res,next){
    //console.log(err);
    res.status(422).send({error: err.message});
});

app.listen(5000, () => {
    console.log(`Server Started at ${5000}`)
})