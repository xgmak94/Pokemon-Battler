import connectMongo from '../../utils/ConnectMongo';
import AbilityModel from '../../models/AbilityModel';

import prisma from '../../utils/ConnectPrisma';

export const config = {
  api: {
    responseLimit: '12mb',
  },
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let abilities = await prisma.abilities.findMany();

    res.status(200).send(abilities);
  }
}

// export default async function handler(req, res) {
//   await connectMongo();
//   if (req.method === 'GET') {
//     let info = await AbilityModel.find({}).sort({ id: 1 }).exec();

//     res.status(200).send(info);
//   }
// }
