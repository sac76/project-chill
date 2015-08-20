"use strict";

$(document).ready(function() {
	init();
});

var gameEngine;

function init() {
    //var game = new GameBase('main_canvas');
    //gameEngine = new CatchGameEngine('main_canvas');
    //gameEngine.init();

	//var game = new Catch($("#main_canvas").get(0));
	//game.init();
	//game.run();

    //$('#container').hide();
    /*$('#container').animate({
        opacity: 0
    }, 0, "swing", fadeErrorText);*/

    //fadeErrorText();

    $("#container").hide();

    hideErrorText();
}

function hideErrorText() {
    $("#errorpage").delay(2000).animate({
        opacity: 0
    }, 400, "swing", function() {
        $("#errorpage").hide(0, showLaptop);
    });
}

function showLaptop() {
    $("#container").show(0, function() {
        $("#container").animate({
            opacity: 100
        }, 200, "swing", startGame);
    });
}

function startGame() {
    gameEngine = new CatchGameEngine('main_canvas');
    gameEngine.init();
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