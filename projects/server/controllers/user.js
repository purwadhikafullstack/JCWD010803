const db = require('../models');
const user = db.user;
const jwt = require('jsonwebtoken');
const enc = require('bcrypt');


const userController = {
  register : async (req, res) =>{
    try {
      res.status(200).send('success');
    } catch (error) {
      res.status(200).send(error);
    }
  }
}

module.exports = userController;