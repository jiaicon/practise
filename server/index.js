const http = require('http');
const fs = require('fs');

const server = http.createServer();

server.on('request', function (req, res) {
  const { url } = req;
  if (url === '/data') {
    setTimeout(() => { // 测试超时
      res.writeHead(200);
      res.write(JSON.stringify({
        code: 200,
        data: {
          test: 123,
        }
      }))
      res.end();
    }, 1000)
  }
  if (url === '/download/a') {
    const name = 'a.txt';
    const rs = fs.createReadStream(__dirname + '/' + name);
    res.writeHead(200, {
      'Content-type': 'application/octet-stream',
      'Content-Disposition': 'attachment; filename=' + name,
    })
    rs.pipe(res);
  }
})
server.listen(7001, function () {
  console.log('listened at 7001')
});
