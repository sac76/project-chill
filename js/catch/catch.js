"use strict";

var useAltAssets = false;

// Catch
class CatchGameEngine extends GameEngineBase {
	constructor(root) {
		super(root);

		this.numMisses = 0;
		this.useAltAssets = false;
	}

	preload() {

		if (!useAltAssets) {

			// sprites
			this.game.load.spritesheet('cupcake', 'img/cupcake_spritesheet.png', 64, 82, 3);
			this.game.load.spritesheet('airplane', 'img/airplane_spritesheet.png', 100, 50, 2);
			
			this.game.load.atlasJSONHash('balloon_man', 'img/balloon_man.png', 'img/balloon_man.json');
			this.game.load.atlasJSONHash('box_man', 'img/box_man.png', 'img/box_man.json');

			// images
			this.game.load.image('cloud', 'img/cloud.png');
			this.game.load.image('ground', 'img/ground.png');
			this.game.load.image('tree', 'img/tree.png');
			this.game.load.image('sun', 'img/sun.png');
			this.game.load.image('birds', 'img/birds.png');
			this.game.load.image('cityright', 'img/cityright.png');
			this.game.load.image('mountains', 'img/mountains.png');

			this.game.load.image('file1', 'img/files/page_white_acrobat.png');
			this.game.load.image('file2', 'img/files/page_white_excel.png');
			this.game.load.image('file3', 'img/files/page_white_picture.png');
			this.game.load.image('file4', 'img/files/page_white_word.png');
			this.game.load.image('file5', 'img/files/page_white_acrobat_balloon.png');
		} else {

			// sprites
			this.game.load.spritesheet('cupcake', 'img/cupcake_spritesheet.png', 64, 82, 3);
			this.game.load.spritesheet('airplane', 'img/airplane_spritesheet.png', 100, 50, 2);
			
			this.game.load.atlasJSONHash('balloon_man', 'img/balloon_man.png', 'img/balloon_man.json');
			this.game.load.atlasJSONHash('box_man', 'img/blob_man.png', 'img/blob_man.json');

			// images
			this.game.load.image('cloud', 'img/cloud.png');
			this.game.load.image('ground', 'img/ground.png');
			this.game.load.image('tree', 'img/tree.png');
			this.game.load.image('sun', 'img/sun.png');
			this.game.load.image('birds', 'img/birds.png');
			this.game.load.image('cityright', 'img/cityright.png');
			this.game.load.image('mountains', 'img/mountains.png');

			this.game.load.image('file1', 'img/alt/file1.png');
			this.game.load.image('file2', 'img/alt/file2.png');
			this.game.load.image('file3', 'img/alt/file3.png');
			this.game.load.image('file4', 'img/alt/file4.png');
			this.game.load.image('file5', 'img/alt/file5.png');
		}

		this.game.load.atlasJSONHash('penguin', 'img/penguin.png', 'img/penguin.json');

		// sounds
		this.game.load.audio('airplane_flyby', "sound/airplane_flyby.wav");
		this.game.load.audio('collect', "sound/getfile.wav");
		this.game.load.audio('toss', "sound/toss.wav");
	}

	create() {
		super.create();

		this.game.stage.scale.pageAlignHorizontally = true;

		// create ground
		this.ground = this.game.add.sprite(0, this.game.height - 30, 'ground', 0);

		this.ground.width = this.game.width;
		this.ground.height = 40;

		this.game.physics.arcade.enable(this.ground);

		this.ground.body.collidesWorldBounds = true;
		this.ground.body.immovable = true;

		// create background
		var mountains = this.game.add.sprite(0, this.ground.y, 'mountains', 0);

		mountains.anchor.x = 0.0;
		mountains.anchor.y = 1.0;
		mountains.scale.setTo(0.75, 0.75);

		// trees
		var trees = [];
		for (var i = 0; i < 4; i++) {
			var tree = this.game.add.sprite(40 + Math.random() * this.game.width - 180, 
				this.ground.y, 'tree', 0);

			tree.anchor.x = 0.0;
			tree.anchor.y = 1.0;

			var scale = 0.75 + Math.random() * 0.75;
			tree.scale.setTo(scale, scale);
		}

		// birds
		var birdsLeft = this.game.add.sprite(50, 200, 'birds', 0);

		var birdsRight = this.game.add.sprite(this.game.width - 120, this.game.height - 100, 'birds', 0);
		birdsRight.scale.x = -1;
		birdsRight.scale.y = 1;

		// sun
		this.game.add.sprite(this.game.width - 100, 50, 'sun', 0);

		// man
		this.balloonMan = new BalloonManSprite(this.game, this.game.width - 350, this.ground.y);
		
		this.game.add.existing(this.balloonMan);
		
		// penguin
		//this.penguin = new Penguin(this.game, 200, this.ground.y);

		//this.game.add.existing(this.penguin);

		// score
		this.scoreText = this.game.add.text(16, 5, '0 MB', { font: 'Open Sans', fontSize: '17px', fill: '#374265' });

		// create player
		this.player = new Player(this.game, useAltAssets);
		this.player.idle();
		
		this.game.add.existing(this.player);

		// create files
		this.fallingObjects = this.game.add.group();
		this.fallingObjects.enableBody = true;
		this.fallingObjects.physicsBodyType = Phaser.Physics.ARCADE;

		// weather
		this.weather = new Weather(this.game);

		// start game
		this.game.time.events.add(Phaser.Timer.SECOND * 4,
			function() {

				// create airplane
				this.airplane = new AirplaneSprite(this.game);

				this.game.add.existing(this.airplane);

				this.airplane.events.onDropFile.add(function(a) {

					var soundFx = this.game.add.audio('toss');
					soundFx.play();

					var fallingSprite = null;

					var x = Math.min(Math.max(a.x, 30));
					var y = a.y;

					var fileConfig = new FileConfig(this.game, this.airplane.config);

					// figure out what to drop
					if (fileConfig.shouldShowCupcake()) {
						fallingSprite = new FallingCupcakeSprite(a.game, x, y);
					} else {
						fallingSprite = new FallingFileSprite(a.game, x, y, fileConfig);
					}
					
					this.fallingObjects.add(fallingSprite);

					fallingSprite.enablePhysics();
					fallingSprite.update();
				}, this);

				this.airplane.takeoff();
				this.airplane.fly();

				this.balloonMan.animate();
			}, this);

		$('canvas').animate({
			opacity: 100
		}, 1300);
	}

	update() {
		
		// collide player and files
		this.game.physics.arcade.collide(this.player, this.fallingObjects, function (player, fallingFile) {
			var soundFx = this.game.add.audio('collect');
			soundFx.play();

			this.score.increment(fallingFile.getPoints());
			this.scoreText.text = this.score.totalScore + " MB";

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



