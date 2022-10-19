import PokemonModel from '../../models/PokemonModel';
import connectMongo from '../../utils/ConnectMongo';

import prisma from '../../utils/ConnectPrisma';

export const config = {
  api: {
    responseLimit: '12mb',
  },
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const pokemon = await prisma.pokemons.findMany({
      where: {
        id_: {
          gt: parseInt(req.query.offset),
        },
      },
      take: parseInt(req.query.limit),
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

// export default async function handler(req, res) {
//   await connectMongo();

//   if (req.method === 'GET') {
//     let limit = req.query.limit || 151;
//     let offset = req.query.offset || 0;

//     let info = await PokemonModel.find({}, 'name id abilities sprites stats types')
//       .sort({ id: 1 })
//       .skip(offset)
//       .limit(limit)
//       .exec();

//     res.status(200).send(info);
//   }
// }
