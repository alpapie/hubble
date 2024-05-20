const http = require('http');
const fs = require('fs');
const path = require('path');
const { main } = require('./src');

const server = http.createServer((req, res) => {
    try {
                
        const json = fs.readFileSync('./package.json')  
        const package = JSON.parse(json)

        if (!package?.name) {
            throw new Error("No package name in your package.json. please change It")
        }
        main(package?.name)
        let filePath = req.url === '/' ? '/index.html' : req.url;
        filePath = path.join(__dirname, `/${package?.name}/build`, filePath);
        console.log(req.url )
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
                } else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
                    contentType = 'image/jpeg';
                } else if (filePath.endsWith('.png')) {
                    contentType = 'image/png';
                }
    
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
            }
        });
    } catch (error) {
        throw new Error("error to run build folder:",error)
    }
});

//server listen in port 2024
const port = 2020;
server.listen(port, () => {
    console.log(`Serveur lancé sur le port ${new Date().toUTCString()}: http://localhost:${port}`);
});