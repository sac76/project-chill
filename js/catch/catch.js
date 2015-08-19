"use strict";

// Catch

class CatchGameEngine extends GameEngineBase {
	constructor(root) {
		super(root);

		this.numMisses = 0;
	}

	preload() {
		// sprites
		this.game.load.spritesheet('player', 'img/db_man_animations.png', 38, 48, 3);
		this.game.load.spritesheet('cupcake', 'img/cupcake_spritesheet.png', 64, 82, 3)

		// images
		this.game.load.image('airplane', 'img/airplane.png');
		this.game.load.image('cloud', 'img/cloud.png');

		this.game.load.image('file1', 'img/files/page_white_acrobat.png');
		this.game.load.image('file2', 'img/files/page_white_excel.png');
		this.game.load.image('file3', 'img/files/page_white_picture.png');
		this.game.load.image('file4', 'img/files/page_white_word.png');

		// sounds
		this.game.load.audio('airplane_flyby', "sound/airplane_flyby.wav");
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
			var fallingSprite = null;

			var x = Math.min(Math.max(a.x, 30));
			var y = a.y;

			// figure out what to drop
			var rand = Math.random();
			if (rand > 0.75/*0.95*/) {
				fallingSprite = new FallingCupcakeSprite(a.game, x, y);
			} else {
				fallingSprite = new FallingFileSprite(a.game, x, y);
			}
			this.fallingObjects.add(fallingSprite);
		}, this);

		// create ground
		this.ground = this.game.add.sprite();

		this.ground.x = 0;
		this.ground.y = this.game.height - 5;
		this.ground.width = this.game.width;
		this.ground.height = 5;

		this.game.physics.arcade.enable(this.ground);

		this.ground.body.collidesWorldBounds = true;
		this.ground.body.immovable = true;

		// weather
		this.weather = new Weather(this.game);

		// wait a few seconds before the
		// airplane starts flying
		this.game.time.events.add(Phaser.Timer.SECOND * 3, 
			function() {
				this.airplane.takeoff();
				this.airplane.fly();
			}, this);
	}

	update() {
		
		// collide player and files
		this.game.physics.arcade.collide(this.player, this.fallingObjects, function (player, fallingFile) {
			fallingFile.destroy();
		}, null, this);

		// collide files and ground
		this.game.physics.arcade.collide(this.ground, this.fallingObjects, function(ground, fallingFile) {
			fallingFile.onCollideWithGround();
		}, null, this);
	}

	

}



