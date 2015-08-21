"use strict";

class BalloonManSprite extends GameSprite {
	constructor(game, x, y) {
		super(game, x, y, 'balloon_man', 0);

		this.game.physics.arcade.enable(this);

		this.anchor.x = 0.0;
		this.anchor.y = 1.0;
		this.scale.setTo(0.5, 0.5);

		this.body.bounce.setTo(0.2, 0.1);

		this.isFalling = false;

		// animations
		this.animations.add('idle', ['man_00.png']);
		this.animations.add('sit', ['man_00.png', 'man_standup_01.png'], 1, false, false);
		this.animations.add('inflate', ['man_01.png']);
		this.animations.add('fall', ['man_fall_00.png']);
		this.animations.add('dead', ['man_fall_00.png', 'man_down_00.png'], 5);
		this.animations.add('cheer', ['man_cheer_00.png'], 12, false, false);
		this.animations.add('grumble', ['grumble_01.png', 'grumble_02.png', 'grumble_03.png'], 11, true);
		this.animations.add('sitstandup', ['man_standup_01.png', 'man_standup_02.png', 'man_00.png'], 12, false, false);
		this.animations.add('standup', ['man_down_00.png', 'man_standup_00.png', 
			'man_standup_01.png', 'man_standup_02.png', 'man_00.png'], 12, false, false);
		this.animations.add('fly', ['man_01.png', 'man_02.png', 'man_03.png', 'man_04.png', 'man_05.png'], 
			15, false, false);
		this.animations.add('somersault', ['man_00.png', 'man_somersault_00.png', 'man_somersault_00.png', 'man_somersault_01.png',
			'man_somersault_02.png', 'man_somersault_03.png', 'man_somersault_04.png', 'man_somersault_05.png',
			'man_somersault_06.png'],
			10, false, false);
		this.animations.add('jumprope', ['jump_rope_01.png', 'jump_rope_02.png', 'jump_rope_03.png', 'jump_rope_04.png',
			'jump_rope_05.png'], 10, false, false);

		// destroy this sprite if it ever
		// travels out of bounds
		this.events.onOutOfBounds.add(
			function() {
				this.x = -50 + this.game.width / 2 + Math.random() * 100;
				this.y = 0;

				this.body.velocity.x = 0;
				this.body.velocity.y = 0;
				this.body.gravity.x = 0;
				this.body.gravity.y = 0;

				// fall down after a random amount
				// of time
				this.game.time.events.add(Phaser.Timer.SECOND * (5 + Math.random() * 7), 
					function() {
						this.fall();
				}, this);
			}, this);

		this.idle();
	}

	onCollideWithGround() {
		if (this.isFalling) {
			this.isFalling = false;
			this.die();
		}
	}

	animate() {

		this.game.time.events.add(Phaser.Timer.SECOND * (15 + Math.random() * 5), 
			function() {
				// jump rope
				this.jumpRope();

				this.game.time.events.add(Phaser.Timer.SECOND * 10,
					function() {
						// stand around
						this.sit();

						// fly away!
						this.game.time.events.add(Phaser.Timer.SECOND * 8,
							function() {
								// stand up
								this.sitStandUp();

								this.game.time.events.add(Phaser.Timer.SECOND * 5,
									function() {
										this.inflate();
									}, this);
							}, this);
					}, this);
				
			}, this);
	}

	idle() {
		this.animations.play('idle');
	}

	sit() {
		this.animations.play('sit');
	}

	sitStandUp() {
		this.animations.play('sitstandup');
	}

	inflate() {
		this.animations.play('inflate');

		// fly away
		this.game.time.events.add(Phaser.Timer.SECOND * 0.5, 
			function() {
				this.fly();
			}, this);
	}

	fly() {
		this.body.velocity.x = 50
		this.body.velocity.y = -20;

		this.body.gravity.x = -5;
		this.body.gravity.y = -5;

		this.animations.play('fly');
	}

	fall() {
		this.isFalling = true;

		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
		this.body.gravity.x = 0;
		this.body.gravity.y = 150;

		this.animations.play('fall');
	}

	die() {
		this.animations.play('dead');
		this.game.time.events.add(Phaser.Timer.SECOND * 3, 
			function() {
				// stand up, I'm okay!
				this.standup();
			}, this);
	}

	standup() {
		this.animations.play('standup');

		this.game.time.events.add(Phaser.Timer.SECOND * 1.5,
			function() {
				// argh
				this.grumble();

				this.game.time.events.add(Phaser.Timer.SECOND * 3,
					function() {
						this.idle();

						this.game.time.events.add(Phaser.Timer.SECOND * 8,
							function() {
								// time to do a trick!
								this.somersault();
							}, this);
					}, this);
			}, this);
	}

	somersault() {
		var anim = this.animations.play('somersault');
		anim.onComplete.add(function() {
			// tada!
			this.game.time.events.add(Phaser.Timer.SECOND * 1.5, 
			function() {
				this.cheer();
			}, this);
		}, this);
	}

	cheer() {
		this.animations.play('cheer');

		this.game.time.events.add(Phaser.Timer.SECOND * 1.5, 
			function() {
				var fadeAnim = this.game.add.tween(this).to( { alpha: 0 }, 150, Phaser.Easing.Linear.None, false, 1500);
				fadeAnim.onComplete.add(
					function() {
					this.game.time.events.add(Phaser.Timer.SECOND * 10,
						function() {
							this.x = -50 + this.game.width / 2 + Math.random() * 100;
							this.alpha = 1;
							this.idle();
							this.animate();
						}, this);
				}, this);
				fadeAnim.start();
			}, this);
	}

	grumble() {
		this.animations.play('grumble');
	}

	jumpRope() {
		this.animations.play('jumprope', 10, true);
	}

}