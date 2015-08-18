function clamp(value, min, max) {
	if (value < min) {
		value = min;
	}
	if (value > max) {
		value = max;
	}
	return value;
}

/**
 * Calculates the amount of time it will take an object
 * to travel a distance d with an initial velocity v
 * and gravity g.
 */
function calculateTime(v, g, d) {
	return (v * -1 + Math.sqrt(Math.pow(v, 2) + 2 * g * d)) / g;
}