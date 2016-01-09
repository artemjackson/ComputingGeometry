var MAX_X_VALUE = CANVAS_WIDTH;
var MAX_Y_VALUE = CANVAS_HEIGHT;

function Point(x, y) {
    this.x = x;
    this.y = y;
    this.speed = new Vector(0, 0);

    this.add = function (point) {
        var x = this.x + point.x;
        var y = this.y + point.y;
        return new Point(x,y);
    };

    this.subtruct = function (point) {
        this.x -= point.x;
        this.y -= point.y;
        return this;
    };

    this.equals = function (point) {
        return (Math.floor(this.x) == Math.floor(point.x)) && (Math.floor(this.y) == Math.floor(point.y));
    };

    this.multiply = function (number) {
        var x = this.x * number;
        var y = this.y * number;
        return new Point(x, y);
    };

    this.devide = function (number) {
        this.x /= number;
        this.y /= number;
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


function Point3D(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;

    this.speed = new Vector3D(0, 0, 0);

    this.reverse = function () {
        return new Point3D(-this.x, -this.y, -this.z);
    };

    this.multiply = function (number) {
        var x = this.x * number;
        var y = this.y * number;
        var z = this.z * number;
        return new Point3D(x, y, z);
    };

    this.add = function (vector) {
        this.x += vector.x;
        this.y += vector.y;
        this.z += vector.z;
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
        this.z = point.z;
    };

    this.subtruct = function (point) {
        var x = this.x - point.x;
        var y = this.y - point.y;
        var z = this.z - point.z;
        return new Point3D(x, y, z);
    };
}