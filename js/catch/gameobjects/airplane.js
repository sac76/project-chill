"use strict";

/**
 * Percentage of total time traveled
 * to drop the file at.
 */
var fileDropIntervals = [
	[0.2, 0.8],
	[0.5],
	[0.25, 0.4, 0.5, 0.6, 0.75],
	[0.2, 0.3, 0.5, 0.7, 0.8],
	[0.2, 0.4, 0.6, 0.8],
	[0.2, 0.25, 0.3, 0.4]
];


class AirplaneSprite extends GameSprite {
	constructor(game) {
		super(game, 0, 25, 'airplane', 0);

		this.config = new AirplaneConfig(game, this);

		this.animations.add('fly', [0, 1]);
		this.animations.play('fly', 50, true, true);

		// number of times plane has traveled across
		// the screen
		this.currentLap = 0; 

		this.game.physics.arcade.enable(this);

		this.body.collideWorldBounds = false;

		// signals
		this.events.onDropFile = new Phaser.Signal();
		this.events.onOutOfBounds.add(this.onOutOfBounds, this);
	}

	update() {

	}

	onOutOfBounds() {
		// When the plane flies off screen, first pause and then
		// turn it around and fly the other way.
		this.idle();
		this.game.time.events.add(Phaser.Timer.SECOND * this.getPauseDuration(), function() {
			this.body.gravity.setTo(0, 0);
			this.body.y = 25 + Math.random() * this.getHeightVariation();
			this.flip();
			this.fly();
		}, this);
	}

	setDirection(d) {
		if (d != this.direction) {
			super.setDirection(d);
			if (d == Direction.RIGHT) {
				this.body.velocity.x = this.getSpeed();
				this.body.gravity.x = this.getGravity();
			} else {
				this.body.velocity.x = this.getSpeed() * -1;
				this.body.gravity.x = this.getGravity() * -1;
			}
		}
	}

	getSpeed() {
		return 75;
	}

	getGravity() {
		return 150;
	}

	getHeightVariation() {
		if (this.currentLap > 7) {
			return Math.random() * 30;
		}
		return Math.random() * 30;//0;
	}

	getPauseDuration() {
		return 5;
	}

	takeoff() {
		this.setDirection(Direction.RIGHT);
	}

	fly() {
		var soundFx = this.game.add.audio('airplane_flyby');
		soundFx.play();

		// total time to travel across the screen
		var t = calculateTime(Math.abs(this.body.velocity.x), 
			Math.abs(this.body.gravity.x), Math.abs(this.game.world.width));
		
		var intervals = fileDropIntervals[Math.round(Math.random()*5)];
		for (var i = 0; i < intervals.length; i++) {
			var interval = intervals[i];

			this.game.time.events.add(Phaser.Timer.SECOND * (interval * t), function() {
				this.events.onDropFile.dispatch(this);
			}, this);
		}

		this.currentLap = this.currentLap + 1;
	}

	idle() {
		this.isPaused = true;

		this.body.gravity.x = 0;
		this.body.velocity.x = 0;
	}

}