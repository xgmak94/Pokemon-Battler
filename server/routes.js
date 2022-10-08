const express = require('express');
const axios = require('axios');
const pokemon = require('./database/controllers/pokemon');
const ability = require('./database/controllers/ability');
const type = require('./database/controllers/type');
require('dotenv').config();

const router = express.Router();

router.post('/pokemon', pokemon.add);
router.get('/pokemon', pokemon.getAll);

router.get('/abilities/:ability', ability.getOne);
router.get('/abilities', ability.getAll);

router.get('/types', type.getAll);

module.exports = router;
