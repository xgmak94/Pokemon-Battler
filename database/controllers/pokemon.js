const Pokemon = require('../models/Pokemon');

module.exports.getAll = function(req, res) {
  let limit = req.query.limit || 151;
  let offset = req.query.offset || 0;

  Pokemon.find({}).sort({id: 1}).skip(offset).limit(limit).exec((err, results) => {
    if(err) {
      res.status(400).send(err);
    }
    else {
      res.status(200).send(results);
    }
  })
}

module.exports.add = function(req, res) {
  let newPokemon = Pokemon.findOneAndUpdate({'id': req.body.id}, req.body, {upsert: true}, (err, results) => {
    if(err) {
      res.status(400).send(err);
    }
    else {
      res.status(201).send(results);
    }
  })
}