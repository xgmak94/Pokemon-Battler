const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(morgan('tiny'));

app.use('/', routes);

let port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
