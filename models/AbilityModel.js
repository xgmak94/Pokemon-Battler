import { Schema, model, models } from 'mongoose';

const AbilitySchema = Schema({
  id: {
    type: Number,
    unique: true,
  },
  name: String,
  pokemon: Array,
  effect_entries: Array,
});

const Ability = models.Ability || model('Ability', AbilitySchema);

export default Ability;
