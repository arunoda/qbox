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