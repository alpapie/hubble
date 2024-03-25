const http = require('http');
const fs = require('fs');
const path = require('path');
const { main } = require('./src');

const server = http.createServer((req, res) => {
    main()
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(__dirname, '/example/build', filePath);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
        } else {

            let contentType = 'text/html';
            if (filePath.endsWith('.js')) {
                contentType = 'application/javascript';
            } else if (filePath.endsWith('.css')) {
                contentType = 'text/css';
            }

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

//server listen in port 2024
const port = 2024;
server.listen(port, () => {
    console.log(`Serveur lancé sur le port http://localhost:${port}`);
});