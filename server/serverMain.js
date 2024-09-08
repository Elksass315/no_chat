const express = require('express');
const app = express();
const { createServer } = require('node:http');
const server = createServer(app);

require('./startup/socket')(server);
require('./startup/routes')(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

