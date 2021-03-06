/* */ 
(function(process) {
  var pull = require('../index');
  var test = require('tape');
  test('through - onEnd', function(t) {
    t.plan(2);
    var values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    pull(pull.values(values), pull.take(10), pull.through(null, function(err) {
      console.log('end');
      t.ok(true);
      process.nextTick(function() {
        t.end();
      });
    }), pull.collect(function(err, ary) {
      console.log(ary);
      t.ok(true);
    }));
  });
  test('take 5', function(t) {
    pull(pull.values([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), pull.take(5), pull.collect(function(err, five) {
      t.deepEqual(five, [1, 2, 3, 4, 5]);
      t.end();
    }));
  });
})(require('process'));
