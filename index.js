const express = require('express');
const application = express();
const dotenv = require('dotenv');

dotenv.config();

const { PORT } = process.env;

application.use(express.json());
application.use(express.urlencoded({ extended: true }));

require('./src/routes')(application);

application.listen(PORT, function() {
    console.log(`The server is running on http://localhost:${PORT}`);
});
