const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const http = require('http');
const server = http.createServer(app);
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/src/index.html'));
});
server.listen(port, () => {
    console.log('running on port 3000')
});