"use strict";

/**
 * Used for player state.
 */
var PlayerState = {
	IDLE: 0,
	RUN_LEFT : 1,
	RUN_RIGHT : 2
}

class Player extends GameSprite {
	constructor(game, useAltAssets) {
		super(game, game.world.width / 2, game.world.height - 50, 'box_man', 0);

		game.physics.arcade.enable(this);

		this.body.gravity.y = 250;
		this.body.collideWorldBounds = true;
		this.body.bounce.setTo(0, 0.15);
		this.body.immovable = true;

		this.cursors = this.game.input.keyboard.createCursorKeys();

		var runAnimFrames = [];

		if (!useAltAssets) {
			this.scale.setTo(0.5, 0.5);
			runAnimFrames = ['man_run_01.png', 'man_run_02.png', 'man_run_02.png', 'man_run_03.png', 'man_run_04.png',
			'man_run_05.png', 'man_run_06.png', 'man_run_06.png', 'man_run_07.png', 'man_run_08.png'];
		} else {
			this.scale.setTo(0.75, 0.75);
			runAnimFrames = ['man_run_01.png', 'man_run_02.png', 'man_run_03.png', 'man_run_04.png',
			'man_run_05.png', 'man_run_06.png', 'man_run_07.png', 'man_run_08.png', 'man_run_09', 'man_run_10'];
		}

		this.animations.add('idle', ['man_idle_01.png'/*, 'man_idle_02.png', 'man_idle_01.png', 'man_idle_03.png'*/], 6, true, false);
		this.animations.add('run', runAnimFrames, 12, true, false);

		this.idle();
	}

	/**
	 * Sets the state of the Player, automatically changing
	 * it's direction and image/animation.
	 */
	setState(s) {
		if (s != this.state) {
			this.state = s;
			switch (this.state) {
				case PlayerState.IDLE:
					this.body.velocity.x = 0;
					this.animations.play('idle');
					break;
				case PlayerState.RUN_LEFT:
					this.body.velocity.x = -300;
					this.setDirection(Direction.LEFT);
					this.animations.play('run');
					break;
				case PlayerState.RUN_RIGHT:
					this.body.velocity.x = 300;
					this.setDirection(Direction.RIGHT);
					this.animations.play('run');
					break;
				default:
					break;
			}
		}
	}

	update() {
		// keyboard input
		if (this.cursors.left.isDown) {
			this.setState(PlayerState.RUN_LEFT);
		} else if (this.cursors.right.isDown) {
			this.setState(PlayerState.RUN_RIGHT);
		} else {
			this.setState(PlayerState.IDLE);
		}
	}

	idle() {
		this.setState(PlayerState.IDLE);
	}

}