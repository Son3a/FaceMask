var serialport = require('serialport');
var portName = 'COM11';

const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);

const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name: 'dnstykqpa',
    api_key: '592721243373484',
    api_secret: 'II9-bCcD8CkphOGPwwiClJLx7zQ',
    secure: true
});

var portSerial = new serialport.SerialPort({ path: portName, baudRate: 115200 });
portSerial.on('open', () => {
    console.log("on opening");
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/public'));

var io = require('socket.io')(server);

io.on("connection", function (socket) {
    socket.on("lights", function (data) {
        if (data.result != '') {
            cloudinary.uploader.upload(data.result).then((result) => {
                console.log(data.tag + result.url);
                portSerial.write(data.tag + result.url)
            });
        }
    });
});
server.listen(3000, () => console.log('listening in port 3000'));
