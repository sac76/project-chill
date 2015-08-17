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
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		
		// create player
		this.player = new Player(this.game, this.game.add.sprite(20, 20, 'player', 0));

		this.game.physics.arcade.enable(this.player.sprite);

		this.player.sprite.body.gravity.y = 200;
		// create files

		
	}

}

class Player extends GameObjectBase {
	constructor(game, sprite) {
		super(game, new Phaser.Sprite(game, 0, 0, 'player', 0));
		//game.physics.arcade.enable(this);
		//this.sprite.body.gravity.y = 20;
	}
}

