const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();

mongoose.connect(process.env.mongoURI, {
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
