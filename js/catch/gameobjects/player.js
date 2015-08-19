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
	constructor(game) {
		super(game, game.world.width / 2, 100, 'player', 0);

		this.state = PlayerState.IDLE;

		game.physics.arcade.enable(this);

		this.body.gravity.y = 250;
		this.body.collideWorldBounds = true;
		this.body.bounce.setTo(0, 0.15);
		this.body.immovable = true;

		this.animations.add('idle');
		this.animations.add('run');

		this.cursors = this.game.input.keyboard.createCursorKeys();
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