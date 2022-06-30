const express = require('express');

const app = express();

app.get('/', function(req, res) {
  res.send('Hello Word');
})

app.listen(7002, function() {
  console.log('listened at http://localhost:7002');
})
