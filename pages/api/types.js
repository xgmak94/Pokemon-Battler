import connectMongo from '../../utils/ConnectMongo';
import TypeModel from '../../models/TypeModel';

export default async function handler(req, res) {
  await connectMongo();

  if (req.method === 'GET') {
    let info = await TypeModel.find({}).sort({ id: 1 }).exec();

    res.status(200).send(info);
  }
}
