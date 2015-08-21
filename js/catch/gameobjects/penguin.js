"use strict";

class Penguin extends GameSprite {
	constructor(game, x, y) {
		super(game, x, y, 'penguin', 0);

		this.animations.add('stand', ['stand_01.png']);

		this.game.physics.arcade.enable(this);

		this.anchor.x = 0.0;
		this.anchor.y = 1.0;
		this.scale.setTo(0.6, 0.6);

		this.idle();
	}

	idle() {
		this.animations.play('stand');
	}

}