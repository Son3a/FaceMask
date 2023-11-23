const http = require('http');
var fs = require('fs');
var index = fs.readFileSync('index.html');
var serialport = require('serialport');
var portName = 'COM6';

const express = require('express')
const app = express()
const path = require("path")
const server = require('http').createServer(app);

// var portSerial = new serialport.SerialPort({ path: portName, baudRate: 9600 });
// portSerial.on('open', () => {
//     console.log("on opening");
// })
app.use(express.static( path.join(__dirname, './public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.get('/', (req, res) => {
    res.render('face_mask.ejs')
})

var io = require('socket.io')(server);

io.on("connection", function (socket) {
    socket.on("lights", function (data) {
        portSerial.write(data.status)
        console.log(data);
    });
});
server.listen(3000, () => console.log("listening in port 3000"));

// app.listen(3000, ()=>console.log("listening in port 3000"))


