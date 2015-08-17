"use strict";

class GameEngineBase {
	constructor(root) {
		this.root = root;
		this.gameObjects = [];
	}

	init() {
		this.game = new Phaser.Game(500, 400, Phaser.Auto, this.root, 
			{ preload: this.preload, create: this.create, update: this.update });
	}

	preload() {
    	// override
	}

	create() {
		// override
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

}

class GameObjectBase {
	constructor(game, sprite) {
		this.game = game;
		this.sprite = sprite;
	}

}