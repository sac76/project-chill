"use strict";

// Catch

class CatchGameEngine extends GameEngineBase {
	constructor(root) {
		super(root);

		this.numMisses = 0;
	}

	preload() {
		this.game.load.image('player', 'img/db_avatar.png');
		this.game.load.image('file_pdf', 'img/db_file_pdf.png');
	}

	create() {
		super.create();

		this.score = new Score();
		
		// create player
		this.player = new Player(this.game);
		
		// create files
		this.fallingObjects = this.game.add.group();
		this.fallingObjects.enableBody = true;
		this.fallingObjects.physicsBodyType = Phaser.Physics.ARCADE;

		for (var i = 0; i < 4; i++) {
			var fileX = 40 + Math.random() * this.game.world.width - 80; // padding on left & right
			var fileY = 0;

			var fileObject = new FileGameObject(this.game, this.fallingObjects, fileX, fileY);
			super.addGameObject(fileObject);
		}
	}

	update() {
		
		var deltaScore = 0;

		// physics
		var playerBody = this.player.sprite.body;
		for (var i = 0; i < this.gameObjects.length; i++) {
			var gameObject = this.gameObjects[i];
			if (gameObject.sprite.body != null) {
				
				// check for out of bounds
				if (gameObject.sprite.body.y > this.game.world.height) {
					gameObject.recycle();
				}
				// check for collisions
				else if (this.game.physics.arcade.intersects(playerBody, gameObject.sprite.body)) {
					deltaScore += gameObject.getPoints();
					gameObject.recycle();
				}
			}
		}

		// increment score
		if (deltaScore > 0) {
			super.setScore(this.score.totalScore + deltaScore, false);
		}

		// keyboard input
		if (this.cursors.left.isDown) {
			playerBody.velocity.x = -300;
		} else if (this.cursors.right.isDown) {
			playerBody.velocity.x = 300;
		} else {
			playerBody.velocity.x = 0;
		}
	}

}

class Player extends GameObjectBase {
	constructor(game) {
		super(game, game.add.sprite(game.world.width / 2, 100, 'player', 0));

		game.physics.arcade.enable(this.sprite);

		this.sprite.body.gravity.y = 250;
		this.sprite.body.collideWorldBounds = true;
		this.sprite.body.bounce.setTo(0.15, 0.15);
	}
}

class FileGameObject extends GameObjectBase {
	constructor(game, group, xPos, yPos) {
		super(game, group.create(xPos, yPos, 'file_pdf'));

		this.sprite.body.collideWorldBounds = false; // pass through bottom

		this.recycle();
	}

	recycle() {
		this.sprite.body.x = 40 + Math.random() * this.game.world.width - 80; // padding on left & right
		this.sprite.body.y = -50;
		this.sprite.body.gravity.y = Math.round(10 + Math.random() * 75);
		this.sprite.body.velocity.y = 0;
	}

	getPoints() {
		return 5 * this.sprite.body.gravity.y;
	}
}

