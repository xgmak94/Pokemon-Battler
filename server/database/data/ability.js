const axios = require('axios');
const Ability = require('../models/Ability');

const numAbilities = 267;

addAll = async function (limit, offset) {
  let abilities = await axios.get(`${process.env.API_URL}/ability`, {
    params: { limit: limit, offset: offset },
  });
  let abilityInfo = abilities.data.results;

  let allAbilityInfo = abilityInfo.map(async (ability, idx) => {
    let info = await axios.get(
      `${process.env.API_URL}/ability/${ability.name}`
    );

    let obj = {
      ...ability,
      ...info.data,
    };
    return obj;
  });

  Promise.all(allAbilityInfo).then((results) => {
    results.forEach((result) => {
      console.log(`adding ${result.name}, ${result.id}`);
      Ability.findOneAndUpdate({ id: result.id }, result, {
        upsert: true,
      }).exec();
    });
  });
};

addAll(numAbilities, 0);
