const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();

mongoose.connect(process.env.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const TypeSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  name: String,
  damage_relations: Object,
  pokemon: Array,
  moves: Array,
});

const Type = mongoose.model('Type', TypeSchema);

module.exports = Type;
