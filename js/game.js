"use strict";

class GameEngineBase {
	constructor(root) {
		this.root = root;
		this.gameObjects = [];
		this.score = new Score();
	}

	init() {
		this.game = new Phaser.Game(500, 400, Phaser.Auto, this.root, 
			{ preload: this.preload, create: this.create, update: this.update });
	}

	preload() {
    	// override
	}

	create() {
		this.gameObjects = [];

		this.cursors = this.game.input.keyboard.createCursorKeys();

		this.scoreText = this.game.add.text(16, 16, '0', { fontSize: '32px', fill: '#fff' })
	}

	update() {
		// override
	}

	addGameObject(g) {
		this.gameObjects.push(g);
	}

	removeGameObject(g) {
		var pos = this.gameObjects.indexOf(g);
		if (pos != -1) {
			this.gameObjects.splice(pos, 1);
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

class GameObjectBase {
	constructor(game, sprite) {
		this.game = game;
		this.sprite = sprite;
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