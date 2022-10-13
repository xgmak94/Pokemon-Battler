import { Schema, model, models } from 'mongoose';

const PokemonSchema = Schema({
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

const Pokemon = models.Pokemon || model('Pokemon', PokemonSchema);

export default Pokemon;