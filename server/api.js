const Router = require('express').Router();

Router.get('/',(req, res) => {
  res.send('api works');
});

module.exports = Router;
