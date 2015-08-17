"use strict";

class PhysicsWorldBase {
	constructor() {
		this.physicsObjects = [];
	}

	addPhysicsObject(obj) {
		this.physicsObjects.push(obj);
	}

	removePhysicsObject(obj) {
		var pos = this.physicsObjects.indexOf(g);
		if (pos != -1) {
			this.physicsObjects = this.physicsObjects.splice(pos, 1);
			this.render();
		}
	}
}

class PhysicsObjectBase {
	constructor(x, y) {
		this.x = 0;
		this.y = 0;
	}

	update(gameObject) {
		this.x = gameObject.x;
		this.y = gameObject.y;
	}

	intersects(obj) {
		return false;
	}

	intersectsPoint(x, y) {
		return false;
	}
}

class SquarePhysicsObject extends PhysicsObjectBase {
	constructor(x, y, width, height) {
		super(x, y);
		this.width = width;
		this.height = height;
	}

	update(gameObject) {
		this.x = gameObject.x;
		this.y = gameObject.y;
		this.width = gameObject.image.width;
		this.height = gameObject.image.height;
	}

	intersects(obj) {
		if (obj instanceof SquarePhysicsObject) {
			return this.x < obj.x + obj.width && this.x + this.width > obj.x 
			&& this.y < obj.y + obj.height && this.y + this.height > obj.y;
			
		}
		return false;
	}

	intersectsPoint(x, y) {
		return x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height;
	}
}