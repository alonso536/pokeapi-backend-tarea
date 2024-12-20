import { model, Schema } from 'mongoose';

const PokemonSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
  },
  level: {
    type: Number,
    required: [true, 'Level is required'],
  },
  num: {
    type: Number,
    required: [true, 'Number is required'],
  },
  trainerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, 
{
  timestamps: true,
});

export const PokemonModel = model('Pokemon', PokemonSchema);