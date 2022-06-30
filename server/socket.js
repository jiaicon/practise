const ws = require('nodejs-websocket');

const server = ws.createServer(function(connect) {
  connect.on('text', function(message) {
    const content = JSON.parse(message);
    connect.send(`服务器收到了消息: ${content.message}`)
  })
  connect.on('close', function(code, reason) {
    console.log(code, reason);
  })
  connect.on('error', function(err) {
    console.log('err: ', err);
  })
  connect.on('open', function(code) {
    console.log('connect:', code);
  })
})

server.listen('7003', function() {
  console.log('listened at ws://localhost:7003');
})
