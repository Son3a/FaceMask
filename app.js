var http = require('http');
var fs = require('fs');

var index = fs.readFileSync('index.html')

const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline');
const { SerialPortMock } = require('serialport')
const { SerialPortStream } = require('@serialport/stream')
const { autoDetect, WindowsBinding } = require('@serialport/bindings-cpp')
const { MockBinding } = require('@serialport/binding-mock')

const path = '\\\\.\\COM9'

MockBinding.createPort(path, { echo: true, record: true })
// const port = new SerialPortStream({ binding: MockBinding, path: path, baudRate: 9600 })

const port = new SerialPort({ path: path, baudRate: 9600, endOnClose: true })

// WindowsBinding.list().then((result) =>{
//     console.log(result);
// })

// port.on('open', () => {
//     console.log("port is opening");
// })

const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

parser.on('data', data => {
    console.log('got word from arduino:', data);
});



// if (!port.isOpen) {
// port.open();
// }

// var app = http.createServer(function (req, res) {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.end(index);
// })

// var io = require('socket.io')(app)

// io.on('connection', function (socket) {
//     socket.on('lights', function (data) {
//         port.write(data.status);
//         console.log(data);
//     })
// })

// app.listen(3000, () => console.log('Listening on port 3000'))