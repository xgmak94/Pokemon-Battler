import axios from 'axios';
import mongoose from 'mongoose';

import Pokemon from '../../database/models/pokemon';

const uri = "mongodb+srv://terribad:Tsugumi090294!@pokemon.owtsqjg.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

export default function handler(req, res) {
  const info = Pokemon.find({}, (err, docs) => {
    if(err) {
      res.status(400).send(err);
    }
    else {
      res.status(200).send(docs);
    }
  })

  if(req.method === 'get') {

  }
  res.status(200).send('iono');
}
