const http = require('http');
const fs = require('fs');
const path = require('path');
const io = require('socket.io')(http);

http.createServer((req, res) => {
    console.log('req ', req.url);

    let filePath = '.' + req.url;

    if (filePath == './')
        filePath = './index.html';

    const extname = String(path.extname(filePath)).toLowerCase();
    let contentType = 'text/html';
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.svg': 'application/image/svg+xml'
    };

    contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                response.writeHead(404, {'Content-Type': 'text/plain'});
                response.end('error 404.\n');
            }
            else {
                res.writeHead(500);
                res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                res.end();
            }
        }
        else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
}).listen(8080);

console.log('Server running at http://0.0.0.0:8080/');

io.on('connection', socket => {

    console.log('user Connected');

    socket.on('start', () => {
        console.log('start & act!');
        io.emit('act');
    });
    
    socket.on('disconnect', () => {
        console.log('user Disconnected');
    });

});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const start = async () => {
    await sleep(1000);   
}