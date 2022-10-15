import connectMongo from '../../utils/ConnectMongo';
import TypeModel from '../../models/TypeModel';

import prisma from '../../utils/ConnectPrisma';

export const config = {
  api: {
    responseLimit: '12mb',
  },
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const types = await prisma.types.findMany();

    res.status(200).send(types);
  }
}

// export default async function handler(req, res) {
//   await connectMongo();
//   if (req.method === 'GET') {
//     let info = await AbilityModel.find({}).sort({ id: 1 }).exec();

//     res.status(200).send(info);
//   }
// }
