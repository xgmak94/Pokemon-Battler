import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../utils/ConnectPrisma';

export const config = {
  api: {
    responseLimit: '12mb',
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    let abilities = await prisma.abilities.findMany();

    res.status(200).send(abilities);
  }
}
