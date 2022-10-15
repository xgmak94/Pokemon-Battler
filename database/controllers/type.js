const Type = require('../models/type');

module.exports.getAll = function(req, res) {
  Type.find({}).sort({id: 1}).exec((err, results) => {
    if(err) {
      res.status(400).send(err);
    }
    else {
      res.status(200).send(results);
    }
  })
}