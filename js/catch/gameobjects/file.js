"use strict";

class FallingFileSprite extends GameSprite {
	constructor(game, x, y) {
		super(game, x, y, 'file_pdf', 0);
		
		this.game.physics.arcade.enable(this);

		this.body.collideWorldBounds = false; // pass through bottom
		this.body.gravity.y = Math.round(25 + Math.random() * 75);
		this.body.velocity.y = -25;

		// signals
		this.events.onOutOfBounds.add(this.onOutOfBounds, this);
	}

	onOutOfBounds() {
		this.destroy();
	}

	getPoints() {
		return 5 * this.body.gravity.y;
	}
}