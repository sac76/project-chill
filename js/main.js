"use strict";

$(document).ready(function() {
	init();
});

var gameEngine;

function init() {
    //var game = new GameBase('main_canvas');
    gameEngine = new CatchGameEngine('main_canvas');
    gameEngine.init();

	//var game = new Catch($("#main_canvas").get(0));
	//game.init();
	//game.run();
}

function loadScripts(arr, path) {
    var _arr = $.map(arr, function(scr) {
        return $.getScript( (path||"") + scr );
    });

    _arr.push($.Deferred(function( deferred ){
        $( deferred.resolve );
    }));

    return $.when.apply($, _arr);
}