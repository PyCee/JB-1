class Vector {
    constructor (x, y) {
	    this.x = x;
	    this.y = y;
    }
    clone () {
        return new Vector(this.x, this.y);
    }
    add (vector) {
	    return new Vector(this.x + vector.x, this.y + vector.y);
    }
    subtract (vector) {
	    return new Vector(this.x - vector.x, this.y - vector.y);
    }
    scale (scalar) {
	    return new Vector(this.x * scalar, this.y * scalar);
    }
    dot (vector) {
        return this.x * vector.x + this.y * vector.y;
    }
    magnitude () {
        return Math.sqrt(this.dot(this));
    }
    normalize () {
        var sq_magnitude = this.dot(this);
        if(sq_magnitude == 0.0){
            return this;
        } else {
            return this.scale(1.0 / Math.sqrt(sq_magnitude));
        }
    }
    str () {
        return "(" + this.x + ", " + this.y + ")";
    }
}
