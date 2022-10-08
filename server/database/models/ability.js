const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();

const uri =
  'mongodb+srv://terribad:Tsugumi090294!@pokemon.owtsqjg.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const AbilitySchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  name: String,
  pokemon: Array,
  effect_entries: Array,
});

const Ability = mongoose.model('Ability', AbilitySchema);

module.exports = Ability;
