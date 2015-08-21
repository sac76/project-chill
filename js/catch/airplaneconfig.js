"use strict";

/**
 * Percentage of total time traveled
 * to drop the file at.
 */
var fileDropIntervals = [
	[0.5],
	[0.2, 0.8],
	[0.25, 0.4, 0.5, 0.6, 0.75],
	[0.2, 0.3, 0.5, 0.7, 0.8],
	[0.2, 0.4, 0.6, 0.8],
	[0.2, 0.25, 0.3, 0.4]
];

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

		this.currentLap = 0;
	}

	getCurrentLap() {
		return this.currentLap;
	}

	getAltitude() {
		return this.getBaseAltitude() + this.getAltitudeVariation();
	}

	/**
	 * Base distance below top of screen.
	 */
	getBaseAltitude() {
		return 25;
	}

	/**
	 * Extra distance below the top of the screen
	 * on top of the base distance.
	 */
	getAltitudeVariation() {
		if (this.currentLap > 5) {
			var rand = Math.random();
			if (rand > 0.95) {
				return 90;
			} else if (rand > 0.9) {
				return 60;
			}
		}
		return 0;
	}

	getSpeed() {
		return 75;
	}

	getGravity() {
		return 150;
	}

	getPauseDuration() {
		return 5;
	}

	getMaxNumFiles() {
		var maxNumFiles = 0;
		switch (this.currentLap) {
			case 0:
				maxNumFiles = 1;
				break;
			case 1:
			case 2:
				maxNumFiles = 2;
				break;
			case 3:
			case 4:
			case 5:
			case 6:
				maxNumFiles = 4;
				break;
			default:
				maxNumFiles = 5;
				break;
		}
		return maxNumFiles;
	}

	getFileDropIntervals(t) {
		var maxNumFiles = this.getMaxNumFiles();

		var times = [];

		// Drop the first one roughly in the center
		if (this.currentLap == 0) {
			times.push(0.6 * t);
		}
		// Drop the second two roughly on opposite
		// sides of the screen 
		else if (this.currentLap == 1) {
			times.push(0.4 * t, 0.9 * t);
		}
		// Randomize
		else {
			for (var i = 0; i < maxNumFiles; i++) {
				var rand = this.game.rnd.between(30, 90) / 100;
				var time = rand * t;
				times.push(time);
			}
		}
		return times;

		/*else {
			return fileDropIntervals[Math.round(Math.random() * (fileDropIntervals.length - 1))];
		}*/
	}

}