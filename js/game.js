"use strict";

class GameEngineBase {
	constructor(root) {
		this.root = root;
		this.sprites = [];
		this.score = new Score();
	}

	init() {
		this.game = new Phaser.Game(640, 368, Phaser.Auto, this.root, 
			{ preload: this.preload, create: this.create, update: this.update });
		//this.game.transparent = true;
	}

	preload() {
    	// override
	}

	create() {

		this.game.stage.backgroundColor = "#d9ecfb";

		this.sprites = [];
		this.score = new Score();

		this.cursors = this.game.input.keyboard.createCursorKeys();
	}

	update() {
		// override
	}

	addSprite(s) {
		this.sprites.push(s);
	}

	removeSprite(s) {
		var pos = this.sprites.indexOf(s);
		if (pos != -1) {
			this.sprites.splice(pos, 1);
		}
	}

	setScore(newScore, animated) {
		if (animated) {
			this.score.totalScore = newScore;
			this.scoreText.text = newScore;
		} else {
			this.score.totalScore = newScore;
			this.scoreText.text = newScore;
		}
	}

}

/**
 * Used for sprite directions.
 */
var Direction = {
	NONE: 0,
	LEFT : 1,
	RIGHT : 2
}

class GameSprite extends Phaser.Sprite {
	constructor(game, x, y, key, frame) {
		super(game, x, y, key, frame);

		this.direction = Direction.NONE;

		this.checkWorldBounds = true;
		this.anchor.setTo(0.5, 0.0);
	}

	enablePhysics() {
		// override
	}

	/**
	 * Sets the direction of the GameSprite, also flipping
	 * the asset.
	 */
	setDirection(d) {
		this.direction = d;
		var scaleX = this.scale.x;
		var scaleY = this.scale.y;
		if (d == Direction.RIGHT) {
			this.scale.setTo(Math.abs(scaleX), scaleY);
		} else {
			this.scale.setTo(-1 * Math.abs(scaleX), scaleY);
		}
	}

	/**
	 * Flips the direction of this GameSprite.
	 */
	flip() {
		if (this.direction == Direction.LEFT) {
			this.setDirection(Direction.RIGHT);
		} else if (this.direction == Direction.RIGHT) {
			this.setDirection(Direction.LEFT);
		}
	}

}


class Score {
	constructor() {
		this.totalScore = 0;
	}

	increment(deltaScore) {
		this.totalScore += deltaScore;
	}

	decrement(deltaScore) {
		this.totalScore -= Math.max(0, deltaScore);
	}

}