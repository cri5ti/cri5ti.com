"use strict";


window.onerror = function(err) {
	log(err);
}

var log = function(msg) {
	$('body').append($('<li>').text(msg));
}



// --------------------------------------------------------------------------------------------------------------



function img(url, done) {
	var $img = $('<img>');
	$img.on('load', function() { done($img.get(0)); });
	$img.attr('src', url);
}



function svgcache(svg, width, height) {
	var $canvas = $('<canvas>').attr({width: width + 2, height: height + 2});
	var canvas = $canvas.get(0);
	var ctx = canvas.getContext('2d');
	ctx.drawImage(svg, 1, 1, width, height);
	return canvas;
}



// --------------------------------------------------------------------------------------------------------------


function time(name, method) {
	if (arguments.length == 1) { method = arguments[0]; name = ""; }
	var before = getTimer();
	method();
	var delay = getTimer() - before;
	console.log(name, delay);
}

function bench(times, method) {
	if (arguments.length < 2) throw "invalid arguments";
	time(function() {
		for(var i=0; i<times; i++)
			method();
	});
}




var getTimer = (function() {
	if (window.performance && window.performance.now) {
    	console.log("Using high performance timer");
    	return function() { return window.performance.now(); };
	} else {
	    if (window.performance && window.performance.webkitNow) {
        	console.log("Using webkit high performance timer");
        	return function() { return window.performance.webkitNow(); };
    	} else {
        	console.log("Using low performance timer");
        	return function() { return new Date().getTime(); };
    	}
	}
})();



// ------------------


(function() {
	var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {

        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };

})();


// --------------------------------


