const axios = require('axios');
const Type = require('../models/type');

const numType = 20;

addAll = async function (limit, offset) {
  let types = await axios.get(`${process.env.API_URL}/type`, {
    params: { limit: limit, offset: offset },
  });
  let allTypes = types.data.results;

  let allTypeInfo = allTypes.map(async (type) => {
    let info = await axios.get(
      `${process.env.API_URL}/type/${type.name}`
    );

    let obj = {
      ...type,
      ...info.data,
    };
    return obj;
  });

  Promise.all(allTypeInfo).then((results) => {
    results.forEach((result) => {
      Type.findOneAndUpdate({ id: result.id }, result, {
        upsert: true,
      }).exec((err, results) => {
        if (err) {
          console.log(result.id, result.name, 'ERRORED REAL HARD');
        } else {
          console.log(result.id, result.name, 'inserted');
        }
      });
    });
  });
};

addAll();
