const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();

const uri = "mongodb+srv://terribad:Tsugumi090294!@pokemon.owtsqjg.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const PokemonSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  name: String,
  abilities: Array,
  forms: Array,
  game_indices: Array,
  height: Array,
  held_items: Array,
  is_default: Boolean,
  moves: Array,
  sprites: Object,
  stats: Array,
  types: Array,
  varieties: Array,
});

const Pokemon = mongoose.model('Pokemon', PokemonSchema);

module.exports = Pokemon;