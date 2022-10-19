const axios = require('axios');
const Pokemon = require('../models/Pokemon');

const count = {
  GEN_1: 151,
  GEN_2: 251,
  GEN_3: 386,
  GEN_4: 493,
  GEN_5: 649,
  GEN_6: 721,
  GEN_7: 809,
  GEN_8: 905,
};

addAll = async function (limit, offset) {
  let response = await axios.get(`${process.env.API_URL}/pokemon`, {
    params: { limit: Number(limit), offset: Number(offset) },
  });
  let allPokemonInfo = response.data.results;

  let allInfo = allPokemonInfo.map(async (pokemonInfo, idx) => {
    try {
      let nameArr = pokemonInfo.name.split('-');
      let speciesName = '';

      let set = new Set([
        'm', // nidoran-m
        'f', // nidoran-f
        'mime', // mr-mime
        'oh', // ho-oh
        'z', // porygon-z
        'jr', // mime-jr
        'o', // kommo-o
        'fini', // tapu-fini
        'koko', // tapu-koko
        'bulu', // tapu-bulu
        'lele', // tapu-lele
        'null', // type-null
        'rime', // mr-rime
      ]);
      if (nameArr.length === 1) {
        speciesName = nameArr[0];
      } else if (set.has(nameArr[1])) {
        speciesName = pokemonInfo.name;
      } else {
        speciesName = nameArr[0];
      }

      let response = await axios.get(
        `${process.env.API_URL}/pokemon/${pokemonInfo.name}`
      );
      let species = await axios.get(
        `${process.env.API_URL}/pokemon-species/${speciesName}`
      );

      let obj = {
        ...pokemonInfo,
        ...response.data,
        ...species.data,
      };

      return obj;
    } catch (err) {
      console.log('err', pokemonInfo.name);
    }
  });

  Promise.all(allInfo).then((results) => {
    results.forEach((result, idx) => {
      if (result !== undefined) {
        Pokemon.findOneAndUpdate({ id: result.id }, result, {
          upsert: true,
        }).exec((err, results) => {
          if (err) {
            console.log(result.id, result.name, 'ERRORED REAL HARD');
          } else {
            console.log(result.id, result.name, 'inserted');
          }
        });
      }
    });
  });
};

// addAll(count.GEN_1, 0); // 1-151
addAll(count.GEN_2 - count.GEN_1, count.GEN_1); // 152-251
// addAll(count.GEN_3 - count.GEN_2, count.GEN_2); // 252-386
// addAll(count.GEN_4 - count.GEN_3, count.GEN_3); // 387-493
// addAll(count.GEN_5 - count.GEN_4, count.GEN_4); // 494-649
// addAll(count.GEN_6 - count.GEN_5, count.GEN_5); // 650-721
// addAll(count.GEN_7 - count.GEN_6, count.GEN_6); // 722-809
// addAll(count.GEN_8 - count.GEN_7, count.GEN_7); // 810-905

