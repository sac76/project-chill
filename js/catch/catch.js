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
		this.game.load.spritesheet('cupcake', 'img/cupcake_spritesheet.png', 64, 82, 3);
		this.game.load.spritesheet('airplane', 'img/airplane_spritesheet.png', 100, 50, 2);
		
		this.game.load.atlasJSONHash('balloon_man', 'img/balloon_man.png', 'img/balloon_man.json');

		// images
		this.game.load.image('cloud', 'img/cloud.png');
		this.game.load.image('ground', 'img/ground.png');
		this.game.load.image('tree', 'img/tree.png');
		this.game.load.image('sun', 'img/sun.png');
		this.game.load.image('birds', 'img/birds.png');

		this.game.load.image('file1', 'img/files/page_white_acrobat.png');
		this.game.load.image('file2', 'img/files/page_white_excel.png');
		this.game.load.image('file3', 'img/files/page_white_picture.png');
		this.game.load.image('file4', 'img/files/page_white_word.png');
		this.game.load.image('file5', 'img/files/page_white_acrobat_balloon.png');

		// sounds
		this.game.load.audio('airplane_flyby', "sound/airplane_flyby.wav");
	}

	create() {
		super.create();

		// create ground
		this.ground = this.game.add.sprite(0, this.game.height - 30, 'ground', 0);

		this.ground.width = this.game.width;
		this.ground.height = 40;

		this.game.physics.arcade.enable(this.ground);

		this.ground.body.collidesWorldBounds = true;
		this.ground.body.immovable = true;

		// trees
		var trees = [];
		for (var i = 0; i < 4; i++) {
			var tree = this.game.add.sprite(40 + Math.random() * this.game.width - 80, 
				this.ground.y, 'tree', 0);

			tree.anchor.x = 0.0;
			tree.anchor.y = 1.0;

			var scale = 0.75 + Math.random() * 0.75;
			tree.scale.setTo(scale, scale);
		}

		// birds
		var birdsLeft = this.game.add.sprite(50, 200, 'birds', 0);

		var birdsRight = this.game.add.sprite(this.game.width - 80, this.game.height - 100, 'birds', 0);
		birdsRight.scale.x = -1;
		birdsRight.scale.y = 1;

		// sun
		this.game.add.sprite(this.game.width - 100, 50, 'sun', 0);

		// man
		this.balloonMan = new BalloonManSprite(this.game, this.game.width - 350, this.ground.y);
		this.balloonMan.animate();

		this.game.add.existing(this.balloonMan);
		
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
			if (rand > 0.95) {
				fallingSprite = new FallingCupcakeSprite(a.game, x, y);
			} else {
				fallingSprite = new FallingFileSprite(a.game, x, y);
			}
			this.fallingObjects.add(fallingSprite);
		}, this);

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

		// collide player and ground
		this.game.physics.arcade.collide(this.player, this.ground);

		// collide extras and ground
		this.game.physics.arcade.collide(this.ground, this.balloonMan, function(ground, balloonMan) {
			balloonMan.onCollideWithGround();
		}, null, this);
	}

	

}



