var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, {
  cors: {
    origin: '*'
  }
});

const users = []
io.on('connection', function (socket) {
  const user = {};
  socket.on('join', function (message) {
    user.id = socket.id;
    user.userName = message.userName;
    users.push({
      userName: message.userName,
      id: socket.id,
    })
    socket.broadcast.emit('joinNoticeOthers', {
      action: '进入房间',
      count: users.length,
      userName: message.userName,
    })
    socket.emit('joinNoticeSelf', {
      action: '进入房间成功',
      userName: message.userName,
      count: users.length,
    })
  });
  socket.on('message', function (message) {
    io.emit('message', message);
  })
  socket.on('disconnect', function () {
    const index = users.findIndex(item => item.userName === user.userName);
    users.splice(index, 1);
    io.emit('leave', {
      action: '离开房间',
      ...user,
      count: users.length,
    })
    socket.disconnect();
  });
});

http.listen(7004, function () {
  console.log('listened at ws://localhost:7004');
});