import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../utils/ConnectPrisma';

export const config = {
  api: {
    responseLimit: '12mb',
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const pokemon = await prisma.pokemons.findMany({
      where: {
        id_: {
          gt: parseInt(req.query.offset as string),
        },
      },
      take: parseInt(req.query.limit as string),
      orderBy: {
        id_: 'asc',
      },
      select: {
        id_: true,
        name: true,
        types: true,
        sprites: {
          select: {
            other: {
              select: {
                official_artwork: {
                  select: {
                    front_default: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    res.send(pokemon);
  }
}
