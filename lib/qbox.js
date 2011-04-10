function QBox(steps) {
	
	var isReady = false;
	var queue = [];
	var isStop = false;
	
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
		
		if(steps && steps instanceof Array) {
			
			var index = steps.indexOf(step);
			if(index >= 0) {
				
				steps = [].concat(steps.slice(0, index), steps.slice(index+1));
				if(steps.length == 0) {
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
					callback(steps);
				}
			}, amount);
		}
	};
	
	this.stop = function() {
		isStop = true;
	};
};

exports.create = function(steps) {
	return new QBox(steps);
};
