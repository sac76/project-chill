"use strict";

class Weather {
	constructor(game) {
		this.game = game;

		this.create();
	}

	create() {

		this.cloudGroup = this.game.add.group();
		this.cloudGroup.enableBody = true;
		this.cloudGroup.physicsBodyType = Phaser.Physics.ARCADE;

		this.clouds = [];
		for (var i = 0; i < 5; i++) {
			var cloudSprite = this.createCloud();
			cloudSprite.events.onOutOfBounds.add(this.onOutOfBounds, cloudSprite);

			if (i % 2 != 0) {
				cloudSprite.alpha = 0.7;
			}

			// for the first time, distribute the clouds at
			// random across the screen
			cloudSprite.x = 20 + Math.random() * 200;

			this.cloudGroup.add(cloudSprite);
		}

		// start timer to add random gust of wind
		this.startGustTimer();
	}

	createCloud() {
		var cloudSprite = new GameSprite(this.game, 0, 0, 'cloud', 0);
		
		this.game.physics.arcade.enable(cloudSprite);

		var scale = 0.35 + Math.random() * 0.75;

		cloudSprite.scale.setTo(scale, scale);
		cloudSprite.y = 10 + Math.random() * 180;

		cloudSprite.body.velocity.x = 10 + Math.random() * 30;

		return cloudSprite;
	}

	startGustTimer() {
		return; // disabled for now
		//this.gustTimer = this.game.time.events.add(Phaser.Timer.SECOND * 5, this.gustOfWind, this);
	}

	/**
	 * Applies a gust of wind from the east or west.
	 */
	gustOfWind() {
		var windSpeed = 20 + Math.random() * 50;
		var windDuration = 2 + Math.random(2);

		// apply a gust of wind to each cloud
		for (var i = 0; i < this.cloudGroup.children.length; i++) {
  			var cloudSprite = this.cloudGroup.children[i];
  			cloudSprite.body.velocity.x += windSpeed;

  			// return the cloud to its original speed
  			this.game.time.events.add(Phaser.Timer.SECOND * windDuration, function() {
				this.body.velocity.x -= windSpeed;
			}, cloudSprite);
		}

		// start another time to reset the gust timer
		this.game.time.events.add(Phaser.Timer.SECOND * windDuration, this.startGustTimer, this);
	}

	onOutOfBounds() {
		this.x = -this.width;
		this.y = 10 + Math.random() * 120;

		var scale = 0.25 + Math.random() * 0.75;

		this.scale.setTo(scale, scale);
	}


}