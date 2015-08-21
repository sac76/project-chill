"use strict";

var fileNames = [
	'file1',
	'file1',
	'file2',
	'file2',
	'file3',
	'file3',
	'file4',
	'file5'
];

class FallingSprite extends GameSprite {
	constructor(game, x, y, key, frame, config) {
		super(game, x, y, key, frame);

		this.config = config;
		this.collidedWithGround = false;

		this.game.physics.arcade.enable(this);

		this.body.collideWorldBounds = true;

		// destroy this sprite if it ever
		// travels out of bounds
		this.events.onOutOfBounds.add(
			function() {
				this.destroy();
			}, this);
	}

	onCollideWithGround() {
		// set a timer once the file hits the ground to
		// destroy it
		var fadeAnim = this.game.add.tween(this).to( { alpha: 0 }, 150, Phaser.Easing.Linear.None, false, this.getKeepAliveDuration() * 1000);
		fadeAnim.onComplete.add(
			function() {
				this.destroy();
			}, this);
		fadeAnim.start();
	}

	/**
	 * The amount of seconds a file should be kept
	 * alive after falling on the ground.
	 */
	getKeepAliveDuration() {
		return this.config.getKeepAliveDuration();
	}

	/**
	 * The number of points earned when catching
	 * this FallingSprite.
	 */
	getPoints() {
		return 0;
	}
}

class FallingFileSprite extends FallingSprite {
	constructor(game, x, y, config) {
		super(game, x, y, config.getFileKey(), 0, config);
		
		this.scale.x = 0.5;
		this.scale.y = 0.5;

		this.body.bounce.setTo(0, this.config.getBounce());
		this.body.gravity.y = this.config.getGravity();
		this.body.velocity.y = this.config.getVelocity();
	}

	getPoints() {
		var points = this.config.getPoints();

		// You only get half points if the file
		// has touched the ground
		if (this.collidedWithGround) {
			return Math.round(points * 0.5);
		}
		return points;
	}
}

var CupcakeEmotion = {
	NORMAL: 0,
	HAPPY : 1,
	SAD : 2
}

class FallingCupcakeSprite extends FallingSprite {
	constructor(game, x, y) {
		super(game, x, y, 'cupcake', 0);

		this.width = 32;
		this.height = 41;

		this.body.bounce.setTo(0, 0.1);
		this.body.gravity.y = 100;
		this.body.velocity.y = -50;

		this.animations.add('blink', [0, 1]);

		this.normal();

		this.game.time.events.add(Phaser.Timer.SECOND * 1,
			function() {
				this.happy();
			}, this);
	}

	onCollideWithGround() {
		super.onCollideWithGround();
		
		this.collidedWithGround = true;

		this.normal();

		this.animations.play('blink', 30, false, false);
	}

	normal() {
		this.frame = CupcakeEmotion.NORMAL;
	}

	happy() {
		this.frame = CupcakeEmotion.HAPPY;
	}

	getPoints() {
		return 50;
	}

	getKeepAliveDuration() {
		return 5;
	}

}