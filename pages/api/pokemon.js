import connectMongo from '../../utils/ConnectMongo';
import PokemonModel from '../../models/PokemonModel';

export const config = {
  api: {
    responseLimit: '8mb',
  },
};

export default async function handler(req, res) {
  await connectMongo();

  if (req.method === 'GET') {
    let limit = req.query.limit || 151;
    let offset = req.query.offset || 0;

    let info = await PokemonModel.find({}, 'name id abilities sprites stats types')
      .sort({ id: 1 })
      .skip(offset)
      .limit(limit)
      .exec();

    res.status(200).send(info);
  }
}
