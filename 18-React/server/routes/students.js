var express = require('express');
var router = express.Router();

/* GET students listing. */
router.get('/', function(req, res, next) {
  const students = [
    { id: 1, name: 'Alice', age: 20 },
    { id: 2, name: 'Bob', age: 22 },
    { id: 3, name: 'Charlie', age: 21 }
  ];
  res.send(students);
});

module.exports = router;
