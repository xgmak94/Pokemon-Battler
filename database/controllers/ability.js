const Ability = require('../models/ability');

module.exports.getOne = function(req, res) {
  Ability.find({name: req.query.name}).sort({id: 1}).skip(offset).limit(limit).exec((err, results) => {
    if(err) {
      res.status(400).send(err);
    }
    else {
      res.status(200).send(results);
    }
  })
}

module.exports.getAll = function(req, res) {
  Ability.find({}).sort({id: 1}).exec((err, results) => {
    if(err) {
      res.status(400).send(err);
    }
    else {
      res.status(200).send(results);
    }
  })
}