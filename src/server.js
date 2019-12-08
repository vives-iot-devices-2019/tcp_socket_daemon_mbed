const net = require('net');

const PORT = 1337;

const server = net.createServer(function(clientSocket) {

  console.log(`Client connected: ${clientSocket.localAddress}:${clientSocket.localPort} <=> ${clientSocket.remoteAddress}:${clientSocket.remotePort}`);
  clientSocket.setEncoding('utf-8');
  clientSocket.setTimeout(1000);

  clientSocket.on('end', () => {
    console.log('Client disconnected');
  });

  clientSocket.on('error', (err) => {
    console.log(err);
  });

  clientSocket.on('data', (data) => {
    console.log(`Received data from client: ${data}`);
  });

  setInterval(() => {
    let value = Math.round(Math.random() * 100);
    console.log(`Sending ${value} to ${clientSocket.remoteAddress}:${clientSocket.remotePort}`);
    clientSocket.write(`${value}\r\n`);
  }, 1000);

  // clientSocket.write('10\r\n');
	// clientSocket.pipe(clientSocket);   // Echo server
});

server.on('error', (err) => {
  console.log("Error occurred");
});

console.log(`Starting TCP server on port ${PORT}`);
server.listen(PORT, '0.0.0.0');
