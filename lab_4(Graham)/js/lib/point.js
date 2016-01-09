var MAX_X_VALUE = CANVAS_WIDTH;
var MAX_Y_VALUE = CANVAS_HEIGHT;

function Point(x, y) {
    this.x = x;
    this.y = y;
    this.speed = new Vector(0,0);

    this.add = function (vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    };

    this.update = function (time) {
        if (this.speed) {
            this.moveTo(this.add(this.speed.multiply(time)));
        }
    };

    this.moveTo = function (point) {
        this.x = point.x;
        this.y = point.y;
    };

    this.onTheRightSideOf = function (line) {
        return line.getRelativePositionOf(this) == ON_THE_RIGHT_SIDE;
    };

    this.onTheLeftSideOf = function (line) {
        return line.getRelativePositionOf(this) == ON_THE_LEFT_SIDE;
    };

    this.onThe = function (line) {
        return line.getRelativePositionOf(this) == ON_THE_LINE;
    };

    this.reflectFrom = function (vector) {
        var normal = vector.normal();
        this.speed = this.speed.subtruct((normal.multiply(2)).multiply(this.speed.dot(normal) / (normal.dot(normal))));
    }
}

function getRandomPoint() {
    return new Point(getRandomArbitrary(0, MAX_X_VALUE), getRandomArbitrary(0, MAX_Y_VALUE));
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    return Math.round(getRandomArbitrary(min, max));


}

function distance(point1, point2) {
    return Math.sqrt(Math.pow((point2.x - point1.x), 2) + Math.pow((point2.y - point1.y), 2));
}