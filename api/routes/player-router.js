const express = require('express');
const router = express.Router();
const {Player} = require('../model/model');

router.get('/players', async (req, res) => {
    try {
      const players = await Player.find();
      res.status(200).json(players);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

router.post('/score',async (req,res) => {

    console.log("user data", req.body);

const { username, score } = req.body; // Assuming req.body has both username and score

// Check if the user already exists in the database
const existingUser = await Player.findOne({ username });

if (existingUser) {
  // If the user exists, update the score
  await Player.updateOne({ username }, { $set: { score } });

  res.status(200).json({
    success: true,
    message: "User score updated successfully",
    user: existingUser
  });
} else {
  // If the user does not exist, create a new user
  Player.create({ username, score }).then(response => {
    res.status(200).json({
      success: true,
      message: "New user created successfully",
      user: response
    });
  }).catch(err => {
    console.log(err.message);
    res.status(500).json({
      success: false,
      message: "Error creating new user"
    });
  });
}

})

module.exports = router;