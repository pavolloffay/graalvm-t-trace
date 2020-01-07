const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

function handleRequest(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
}

const server = http.createServer(handleRequest);

server.listen(port, hostname, () => {
  print(`Server running at http://${hostname}:${port}/`);
});
