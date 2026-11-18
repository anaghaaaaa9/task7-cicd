const http = require('http');
const server = require('./app');
server.listen(0, () => {
  http.get({ port: server.address().port, path: '/health' }, (r) => {
    if (r.statusCode !== 200) { console.error('TEST FAILED'); process.exit(1); }
    console.log('TEST PASSED');
    server.close();
  });
});