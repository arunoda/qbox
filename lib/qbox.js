function QBox(steps) {
	
	var isReady = false;
	var queue = [];
	var isStop = false;

	var ticks;
	
	addTicks(); //copy steps into ticks

	this.ready = function(callback) {
		if(isReady && !isStop) {
			callback();
		} else {
			queue.push(callback);
		}
	};
	
	this.start = function() {
		if(!isStop) {
			isReady = true;
			queue.forEach(function(callback) {
				callback();
			});
		}
	};
	
	this.tick = function(step) {
		
		if(ticks && ticks instanceof Array) {
			
			var index = ticks.indexOf(step);
			if(index >= 0) {
				
				ticks.splice(index, 1);
				if(ticks.length == 0) {
					this.start();
				}
			} else {
				
				throw new Error("Invalid step: '" + step + "' provided");
			}
		} else {
			throw new Error("Cannot tick - no steps are provided");
		}
	};
	
	/**
	 * @param amount - no of millies fot timeout
	 * callback - function([]){} containing remaining steps
	 */
	this.timeout = function(amount, callback) {
		
		if(!isStop) {
			setTimeout(function() {
				if(!isReady && !isStop) {
					callback(ticks);
				}
			}, amount);
		}
	};
	
	this.stop = function() {
		isStop = true;
	};

	this.reset = function() {
		isReady = false;
		isStop = false;
		addTicks();
	};

	function addTicks() {
		if(steps && steps.length > 0) {
			ticks = [];
			steps.forEach(function(tick) {
				ticks.push(tick);
			});
		}
	}
};

exports.create = function(steps) {
	return new QBox(steps);
};
