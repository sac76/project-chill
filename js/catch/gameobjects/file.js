"use strict";

var fileNames = [
	'file1',
	'file2',
	'file3',
	'file4'
];

class FallingSprite extends GameSprite {
	constructor(game, x, y, key, frame) {
		super(game, x, y, key, frame);

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
		return 0;
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
	constructor(game, x, y) {
		super(game, x, y, fileNames[Math.round(Math.random() * fileNames.length)], 0);
		
		this.width = 32;
		this.height = 32;

		this.body.bounce.setTo(0, 0.1);
		this.body.gravity.y = Math.round(25 + Math.random() * 75);
		this.body.velocity.y = -25;
	}

	getKeepAliveDuration() {
		return 1;
	}

	getPoints() {
		return 5 * this.body.gravity.y;
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
		
		this.normal();
		
		this.animations.play('blink', 30, false, false);
	}

	normal() {
		this.frame = CupcakeEmotion.NORMAL;
	}

	happy() {
		this.frame = CupcakeEmotion.HAPPY;
	}

	blink() {

	}

	getKeepAliveDuration() {
		return 5;
	}

}