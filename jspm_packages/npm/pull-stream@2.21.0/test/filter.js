/* */ 
var test = require('tape');
var pull = require('../index');
test('filtered randomnes', function(t) {
  pull(pull.infinite(), pull.filter(function(d) {
    console.log('f', d);
    return d > 0.5;
  }), pull.take(100), pull.writeArray(function(err, array) {
    t.equal(array.length, 100);
    array.forEach(function(d) {
      t.ok(d > 0.5);
      t.ok(d <= 1);
    });
    console.log(array);
    t.end();
  }));
});
test('filter with regexp', function(t) {
  pull(pull.infinite(), pull.map(function(d) {
    return Math.round(d * 1000).toString(16);
  }), pull.filter(/^[^e]+$/i), pull.take(37), pull.writeArray(function(err, array) {
    t.equal(array.length, 37);
    console.log(array);
    array.forEach(function(d) {
      t.equal(d.indexOf('e'), -1);
    });
    t.end();
  }));
});
test('inverse filter with regexp', function(t) {
  pull.infinite().pipe(pull.map(function(d) {
    return Math.round(d * 1000).toString(16);
  })).pipe(pull.filterNot(/^[^e]+$/i)).pipe(pull.take(37)).pipe(pull.writeArray(function(err, array) {
    t.equal(array.length, 37);
    console.log(array);
    array.forEach(function(d) {
      t.notEqual(d.indexOf('e'), -1);
    });
    t.end();
  }));
});
