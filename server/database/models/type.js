const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();

const uri = "mongodb+srv://terribad:Tsugumi090294!@pokemon.owtsqjg.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, {
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
