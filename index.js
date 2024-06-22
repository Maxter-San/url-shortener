const express = require('express');
const cors = require('cors');
const dotenv = require( 'dotenv' );
const db = require('./server/db');
const useRouterURL = require('./services/url.routes');

const app = express();
app.use( express.json() );
app.use( cors() );

dotenv.config();
const port = process.env.PORT || 9000;

// Conectar a MongoDB
db();

app.use( '/api/url', useRouterURL );

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});