const http = require('http');
const color = process.env.APP_COLOR || 'steelblue';
const version = process.env.APP_VERSION || '1.0';

const server = http.createServer((req, res) => {
  if (req.url === '/health') { res.writeHead(200); return res.end('ok'); }
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`<body style="background:${color};color:white;font-family:sans-serif">
  <h1>CI/CD with Jenkins on Kubernetes</h1><p>Version ${version}</p></body>`);
});

module.exports = server;
if (require.main === module) server.listen(process.env.PORT || 3000);