"use strict";

var fileNames = [
	'file1',
	'file1',
	'file2',
	'file2',
	'file3',
	'file3',
	'file4',
	'file5' // balloon
];

class FileConfig {
	constructor(game, airplaneConfig) {
		this.game = game;
		this.airplaneConfig = airplaneConfig;
		this.isAllBalloons = false;
		
		// Determine file type
		var fileKey = 'file1';
		if (!this.isAllBalloons) {
			if (this.airplaneConfig.getCurrentLap() < 4) {
				// exclude balloon
				fileKey = fileNames[Math.round(Math.random() * fileNames.length - 2)];
			} else {
				// include balloon
				fileKey = fileNames[Math.round(Math.random() * fileNames.length - 1)];

				// there's an extra chance to make this
				// a balloon
				var rand = Math.random();
				if (rand > 0.9) {
					fileKey = 'file5';
				}
			}
		} else {
			this.fileKey = 'file5';
		}
		this.fileKey = fileKey;
	}

	getFileKey() {
		return this.fileKey;
	}

	getBounce() {
		if (this.fileKey == 'file5') {
			return 0.2;
		}
		return 0.1;
	}

	getGravity() {
		// balloon is more floaty
		if (this.fileKey == 'file5') {
			return 5;
		}
		return Math.round(25 + Math.random() * 75);
	}

	getVelocity() {
		if (this.fileKey == 'file5') {
			return -18;
		}
		return -25;
	}

	getKeepAliveDuration() {
		if (this.fileKey == 'file5') {
			return 3.5;
		}
		return 1;
	}

	getPoints() {
		if (this.fileKey == 'file5') {
			return 10;
		}
		return Math.max(2, Math.round(this.getGravity() / 100 * 5));
	}

	shouldShowCupcake() {
		if (this.airplaneConfig.getCurrentLap() > 3) {
			return Math.random() > 0.95;
		}
	}
}