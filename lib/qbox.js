function QBox(steps) {
	
	var isReady = false;
	var queue = [];
	
	this.ready = function(callback) {
		if(isReady) {
			callback();
		} else {
			queue.push(callback);
		}
	};
	
	this.start = function() {
		isReady = true;
		queue.forEach(function(callback) {
			callback();
		});
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
		
		setTimeout(function() {
			if(!isReady) {
				callback(steps);
			}
		}, amount);
	};
};

exports.create = function(steps) {
	return new QBox(steps);
};