var express = require('express');
var app = express();

app.use((req, res, next) => {
  console.log('server1 request host:', req.get('host'));
  console.log('server1 request url:', req.url);
  next();
});

app.get('/students', (req, res) => {
  const students = [
    { id: 1, name: 'Alice', age: 20 },
    { id: 2, name: 'Bob', age: 22 },
    { id: 3, name: 'Charlie', age: 21 }
  ];
  res.send(students);
});

app.listen(5000);