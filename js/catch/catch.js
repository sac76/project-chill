"use strict";

// Catch

class CatchGameEngine extends GameEngineBase {
	constructor(root) {
		super(root);
	}

	preload() {
		this.game.load.image('player', 'img/db_avatar.png');
		this.game.load.image('file_pdf', 'img/db_file_pdf.png');
	}

	create() {
		super.create();

		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		
		// create player
		this.player = new Player(this.game);
		
		// create files
		for (var i = 0; i < 5; i++) {
			var fileObject = new FileGameObject(this.game);
			super.addGameObject(fileObject);
		}
	}

}

class Player extends GameObjectBase {
	constructor(game) {
		super(game, game.add.sprite(20, 20, 'player', 0));

		game.physics.arcade.enable(this.sprite);

		this.sprite.body.gravity.y = 100;
		this.sprite.collideWorldBounds = true;
	}
}

class FileGameObject extends GameObjectBase {
	constructor(game) {
		super(game, game.add.sprite(Math.random() * game.world.width, 0, 'file_pdf', 0));

		game.physics.arcade.enable(this.sprite);

		this.sprite.body.gravity.y = Math.round(50 + Math.random() * 100);
		this.sprite.collideWorldBounds = true;
	}
}

