const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Access-Control-Allow-Headers': 'x-filename',
    'Access-Control-Allow-Origin': '*',
  });

  const filename = req.headers['x-filename'];
  if (!filename) { // OPTIONS
    res.end('ok');
    return;
  }

  const stream = fs.createWriteStream(filename);
  req.pipe(stream);
  req.on('end', () => {
    res.end('ok');
  });
});

server.listen(4000);
