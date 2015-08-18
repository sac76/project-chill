"use strict";

// Catch

class CatchGameEngine extends GameEngineBase {
	constructor(root) {
		super(root);

		this.numMisses = 0;
	}

	preload() {
		this.game.load.spritesheet('player', 'img/db_man_animations.png', 38, 48, 3);
		this.game.load.image('airplane', 'img/airplane.png');
		this.game.load.image('file_pdf', 'img/db_file_pdf.png');
	}

	create() {
		super.create();

		// create player
		this.player = new Player(this.game);
		this.player.idle();
		
		this.game.add.existing(this.player);

		// create files
		this.fallingObjects = this.game.add.group();
		this.fallingObjects.enableBody = true;
		this.fallingObjects.physicsBodyType = Phaser.Physics.ARCADE;

		// create airplane
		this.airplane = new AirplaneSprite(this.game);

		this.game.add.existing(this.airplane);

		this.airplane.events.onDropFile.add(function(a) { 
			var fallingFile = new FallingFileSprite(a.game, a.x, a.y);
			this.fallingObjects.add(fallingFile);
		}, this);

		// wait a few seconds before the
		// airplane starts flying
		this.game.time.events.add(Phaser.Timer.SECOND * 3, function() {
			this.airplane.takeoff();
			this.airplane.fly();
			startgame();
		}, this);
	}

	update() {
		
		this.game.physics.arcade.collide(this.player, this.fallingObjects, function (player, fallingFile) {
			//super.setScore(this.score.totalScore + fallingFile.getPoints(), false);
			fallingFile.destroy();
		}, null, this);

	}

	

}



