"use strict";

class AirplaneSprite extends GameSprite {
	constructor(game) {
		super(game, 0, 25, 'airplane', 0);

		this.config = new AirplaneConfig(game, this);

		this.animations.add('fly', [0, 1]);
		this.animations.play('fly', 50, true, true);

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
		this.game.time.events.add(Phaser.Timer.SECOND * this.config.getPauseDuration(), function() {
			this.body.gravity.setTo(0, 0);
			this.y = this.config.getAltitude();
			this.flip();
			this.fly();
		}, this);
	}

	setDirection(d) {
		if (d != this.direction) {
			super.setDirection(d);
			if (d == Direction.RIGHT) {
				this.body.velocity.x = this.config.getSpeed();
				this.body.gravity.x = this.config.getGravity();
			} else {
				this.body.velocity.x = this.config.getSpeed() * -1;
				this.body.gravity.x = this.config.getGravity() * -1;
			}
		}
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
		
		var intervals = this.config.getFileDropIntervals(t);
		for (var i = 0; i < intervals.length; i++) {
			var interval = intervals[i];

			this.game.time.events.add(Phaser.Timer.SECOND * interval, function() {
				this.events.onDropFile.dispatch(this);
			}, this);
		}

		this.config.currentLap = this.config.currentLap + 1;
	}

	idle() {
		this.isPaused = true;

		this.body.gravity.x = 0;
		this.body.velocity.x = 0;
	}

	getConfig() {
		return this.config;
	}

}