QBox - Quick Flow Control library for NodeJS
=======================================

Introduction
------------

There are a bunch of NodeJS Flow Control libraries.
In order to use most of them you need to change how you program, 
or learn some new syntax.

*Qbox* is meant for people who love to code using their natural style 
and also want to control the flow of their code as they wish.

Install
---------
	npm install qbox

Usage
-----

### Complete After Something Happens

I need to do some tasks after I connect with the database

	var $ = qbox.create();
	
	mydatabase.connect(function() {
		$.start();
	});
	
	$.ready(function() {
		//do something
	});
	
	//somewhere else in your program
	$.ready(function() {
		//do some other stuff
	});

### Complete After a Few Things Happen

I need to do some tasks after I've connected to the database and registry

	var go = qbox.ready(['db', 'registry']);
	
	mydatabase.connect(function() { go.tick('db'); });
	registry.connect(function() { go.tick('registry'); });
	
	go.ready(function() {
		//do something
	});
	
	//timeout after 5 seconds
	go.timeout(5000, function() {
		//show the errors
	});

Browse [Tests](https://github.com/arunoda/qbox/blob/master/tests/qbox.js) for more usage patterns