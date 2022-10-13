import connectMongo from '../../utils/ConnectMongo';
import AbilityModel from '../../models/AbilityModel';

export default async function handler(req, res) {
  await connectMongo();
  if (req.method === 'GET') {
    let info = await AbilityModel.find({}).sort({ id: 1 }).exec();

    res.status(200).send(info);
  }
}
