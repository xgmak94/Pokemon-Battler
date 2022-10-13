import { Schema, model, models } from 'mongoose';

const TypeSchema = Schema({
  id: {
    type: Number,
    unique: true,
  },
  name: String,
  damage_relations: Object,
  pokemon: Array,
  moves: Array,
});

const Type = models.Type || model('Type', TypeSchema);

export default Type;
