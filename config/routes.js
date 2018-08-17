const axios = require('axios');

const { authenticate } = require('./middlewares');

const db = require('../database/dbConfig');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  const user = req.body;
  db('users')
    .insert(user)
    .then(ids => {
      db('users')
        .where({ id: ids[0] })
        .first()
        .then( user => {
          res.status(201).json(user)
        })
        .catch(err => console.error('Registration Failed'))
    })
}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
