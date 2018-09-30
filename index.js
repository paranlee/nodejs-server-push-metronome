const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const day = new Date();
const flag = true;

http.listen(3000, () => {
    console.log('listening on *:3000');
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

    console.log('user Connected');

    socket.on('start', ()=>{
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