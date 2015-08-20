"use strict";

/**
 * This class is used to control properties of the
 * airplane, such as speed, height variation,
 * files dropped, etc. It is also responsible for
 * the associated difficulty of catching files.
 */
class AirplaneConfig {
	constructor(game, airplane) {
		this.game = game;
		this.airplane = airplane;
	}
}