var qbox = require("../lib/qbox");

exports.testSteps = function(test) {
	
	test.expect(1);
	var $ = qbox.create(["db1", "db2"]);
	$.ready(function() {
		test.ok(true);
	});
	
	$.tick("db1");
	$.tick("db2");
	test.done();
};

exports.testStepsInvalid = function(test) {
	
	var $ = qbox.create(["db1", "db2"]);
	$.ready(function() {
		test.fail();
	});
	
	$.tick("db1");
	test.throws(function() {
		$.tick("db222");
	});
	test.done();
};

exports.testTimeout = function(test) {
	
	test.expect(1);
	var $ = qbox.create(["db1", "db2"]);
	$.ready(function() {
		test.fail();
	});
	
	$.tick("db1");
	var start = new Date().getTime();
	$.timeout(200, function() {
		var end = new Date().getTime();
		if(end-start >= 200) {
			test.ok(true);
			test.done();
		} else {
			test.fail("Timeout time smaller");
		}
	});
};

exports.testStopWIthTick = function(test) {
	
	var $ = qbox.create(["db1", "db2"]);
	$.ready(function() {
		test.fail("Should not execute after stops");
	});
	
	$.stop();
	$.tick("db1");
	$.tick("db2");
	test.done();
};

exports.testStopWithoutTick = function(test) {
	
	var $ = qbox.create();
	$.start();
	$.stop();
	$.ready(function() {
		test.fail("Should not execute after stops");
	});
	
	test.done();
};

exports.testAfterStopTimeout = function(test) {
	
	var $ = qbox.create();
	$.stop();
	$.timeout(1000, function() {
		test.fail("Should not call the timeout");
	});
	
	setTimeout(function() {
		test.done();
	}, 1500);
};

exports.testBeforeStopTimeout = function(test) {
	
	var $ = qbox.create();
	
	$.timeout(1000, function() {
		test.fail("Should not call the timeout");
	});
	$.stop();
	setTimeout(function() {
		test.done();
	}, 1500);
};

exports.testReset = function(test) {
	
	var $ = qbox.create([1,2]);
	$.tick(2);
	$.reset();
	$.tick(1);
	$.tick(2);

	$.ready(function() {
		test.done();
	});	
};

exports.testResetAfterStop = function(test) {
	
	test.expect(2);
	var $ = qbox.create([1,2]);

	$.ready(function() {
		test.ok(true);
	});	
	
	$.tick(2);
	$.tick(1);
	$.reset();
	$.tick(1);
	$.tick(2);

	test.done();
};