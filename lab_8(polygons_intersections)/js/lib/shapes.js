function randomColor() {
    return 'rgba(' + getRandomInt(0, 255) + ',' + getRandomInt(0, 255) + ',' + getRandomInt(0, 255) + ', 1.0)';
}
/******************************    Shape   ******************************/
function Shape() {
    var DEFAULT_STROKE = '#000000';
    var DEFAULT_FILL = '#ffffff';
    var DEFAULT_WIDTH = '1';

    this.resources = {
        fill: DEFAULT_FILL,
        stroke: DEFAULT_STROKE,
        width: DEFAULT_WIDTH
    };

    this.setFill = function (color) {
        this.resources.fill = color;
    };
    this.setStroke = function (color) {
        this.resources.stroke = color;
    };
    this.setWidth = function (width) {
        this.resources.width = width;
    };

    this.setStyle = function (resources) {
        this.resources = resources;
    };

    this.unsetStyle = function () {
        this.resources = [];
    };

    this.useStyle = function (ctx) {
        ctx.fillStyle = this.resources.fill;
        ctx.strokeStyle = this.resources.stroke;
        ctx.lineWidth = this.resources.width;
    };

    this.unuseStyle = function (ctx) {
        ctx.filStyle = DEFAULT_FILL;
        ctx.strokeStyle = DEFAULT_STROKE;
        ctx.lineWidth = DEFAULT_WIDTH;
    };

    this.render = function (ctx) {
    };

    this.update = function (time) {
    };
}
/******************************   Shape    ******************************/


/*****************************     Line     *****************************/
var ON_THE_LEFT_SIDE = "ON_THE_LEFT_SIDE";
var ON_THE_RIGHT_SIDE = "ON_THE_RIGHT_SIDE";
var ON_THE_LINE = "ON_THE_LINE";

function Line(start, end) {
    this.start = start;
    this.end = end;

    this.render = function (ctx) {
        this.useStyle(ctx);

        ctx.beginPath();
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(this.end.x, this.end.y);
        ctx.stroke();
        ctx.closePath();

        this.unuseStyle(ctx);
    };

    this.length = function () {
        return Math.sqrt(Math.pow((this.end.x - this.start.x), 2) + Math.pow(this.end.y - this.start.y, 2));
    };

    this.getRelativePositionOf = function (point) {
        var det = determinant(this.end.x - this.start.x, this.end.y - this.start.y,
            point.x - this.start.x, point.y - this.start.y);

        if (det > 0) {
            return ON_THE_LEFT_SIDE;
        }
        else if (det < 0) {
            return ON_THE_RIGHT_SIDE;
        } else {
            return ON_THE_LINE;
        }
    };



    this.aimsAt = function (line) {
        var a = new Vector(this.end.x - this.start.x, this.end.y - this.start.y);
        var b = new Vector(line.end.x - line.start.x, line.end.y - line.start.y);

        var relativePosition = line.getRelativePositionOf(this.end);

        if (!a.isCollinearTo(b)) {

            if ((a.x * b.y) >= (a.y * b.x )) {
                return relativePosition == ON_THE_LEFT_SIDE;
            } else {
                return relativePosition == ON_THE_RIGHT_SIDE;
            }
        } else {
             if ( (a.x * b.x < 0) || (a.y * b.y < 0)) {
                return false;
            } else {
                return a.length() < b.length();
            }
        }
    };

    this.crossedBy = function (line) {
        if (this.getRelativePositionOf(line.start) == this.getRelativePositionOf(line.end)) {
            return false;
        } else if (line.getRelativePositionOf(this.start) == line.getRelativePositionOf(this.end)) {
            return false;
        } else {
            return true;
        }
    };
}
//  Inheritance
Line.prototype = new Shape();

function determinant(a, b, c, d) {
    return a * d - c * b;
}
/*****************************     Line     *****************************/


/*****************************     Circle     *****************************/
function Circle(center, radius) {
    this.center = center;
    this.radius = radius;

    this.render = function (ctx) {
        this.useStyle(ctx);

        ctx.beginPath();
        ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI, false);
        ctx.stroke();
        ctx.fill();

        this.unuseStyle(ctx);
    };

    this.update = function (time) {
        this.center.update(time)
    }
}
//  Inheritance
Circle.prototype = new Shape();

/*****************************     Circle     *****************************/


/*****************************     Polygon     *****************************/
function Polygon(points) {
    this.points = points;

    //  Ray test
    this.has = function (point) {
        var testLine = new Line(new Point(0, point.y), point);
        var currentLine;
        var isOutside = false;

        for (var i = 0; i < this.points.length - 1; ++i) {
            currentLine = new Line(this.points[i], this.points[i + 1]);
            if (currentLine.crossedBy(testLine)) {
                isOutside = !isOutside;
            }
        }

        currentLine = new Line(this.points[this.points.length - 1], this.points[0]);
        if (currentLine.crossedBy(testLine)) {
            isOutside = !isOutside;
        }

        return isOutside;
    };

    this.getSides = function () {
        var sides = [];
        for (var i = 0; i < this.points.length - 1; ++i) {
            sides[sides.length] = new Line(this.points[i], this.points[i + 1])
        }
        sides[sides.length] = new Line(this.points[this.points.length - 1], this.points[0]);
        return sides;
    };

    this.render = function (ctx) {

        if (this.points.length > 2) {
            this.useStyle(ctx);

            ctx.beginPath();
            for (var i = 0; i < this.points.length; ++i) {
                ctx.lineTo(this.points[i].x, this.points[i].y);
            }
            //  line between first and last points

            ctx.lineTo(this.points[0].x, this.points[0].y);


            ctx.stroke();
            ctx.fill();

            this.unuseStyle(ctx);
        }
    }
}
//  Inheritance
Polygon.prototype = new Shape();


/*****************************     SimplePolygon     *****************************/
function SimplePolygon(points) {
    this.points = points;

    //  Octane tests
    this.has = function (point) {
        var sum = 0;

        for (var i = 0; i < this.points.length - 1; ++i) {
            sum += deltaOctane(point, this.points[i], this.points[i + 1])
        }

        sum += deltaOctane(point, this.points[this.points.length - 1], this.points[0]);
        return sum != 0;

        function getOctane(vector) {
            var x = vector.x;
            var y = vector.y;

            if (0 <= y && y < x) {
                return 1;
            }
            if (0 < x && x <= y) {
                return 2;
            }
            if (-y < x && x <= 0) {
                return 3;
            }
            if (0 < y && y <= -x) {
                return 4;
            }
            if (x < y && y <= 0) {
                return 5;
            }
            if (y <= x && x < 0) {
                return 6;
            }
            if (0 <= x && x < -y) {
                return 7;
            }
            if (-x <= y && y < 0) {
                return 8;
            }
            if (x == y == 0) {
                return 0;
            }
        }

        function deltaOctane(q, p_i, p_j) {

            var octane_i = getOctane(new Vector(p_i.x - q.x, p_i.y - q.y));
            var octane_j = getOctane(new Vector(p_j.x - q.x, p_j.y - q.y));


            var delta = octane_j - octane_i;

            if (Math.abs(delta) > 4) {
                delta = corrected(delta);

            }
            if (Math.abs(delta) == 4) {
                var currentSide = new Line(p_i, p_j);
                if (q.onTheRightSideOf(currentSide)) {
                    delta = -4;
                } else if (q.onTheLeftSideOf(currentSide)) {
                    delta = 4;
                } else {
                    delta = 0;
                }
            }

            return delta;
        }

        function corrected(delta) {
            if (delta > 4) {
                delta -= 8;
            } else {
                delta += 8;
            }
            return delta;
        }
    };
}
//  Inheritance
SimplePolygon.prototype = new Polygon();
/*****************************     SimplePolygon     *****************************/


/*****************************     ConvexPolygon     *****************************/
function ConvexPolygon(points) {
    this.points = points;

    //  Binary test
    this.has = function (point) {
        var line_1 = new Line(this.points[0], this.points[1]);
        var line_2 = new Line(this.points[0], this.points[this.points.length - 1]);

        if (pointInSector(point, line_1, line_2)) {
            return binarySearch(this.points, point);
        } else {
            return false;
        }

        function binarySearch(points, point) {

            var l = 0;
            var r = points.length;

            if (r > 3) {
                var m = Math.floor((l + r) / 2);

                if (point.onTheLeftSideOf(new Line(points[0], points[m]))) {
                    return binarySearch(points.slice(0, m + 1), point);
                } else {
                    var newPoints = [points[0]];
                    return binarySearch(newPoints.concat(points.slice(m, points.length)), point);
                }
            } else {
                var lastLine = new Line(points[1], points[2]);
                var lineToPoint = new Line(points[0], point);
                return !(lastLine.crossedBy(lineToPoint));
            }
        }

        function pointInSector(point, line_1, line_2) {
            return point.onTheRightSideOf(line_1) && point.onTheLeftSideOf(line_2);
        }
    };


}
//  Inheritance
ConvexPolygon.prototype = new SimplePolygon();
/*****************************     ConvexPolygon     *****************************/



function getSimplePolygon(vertexesNumber) {
    var polygonPoints = [];
    var currentPoint, previousPoint;

    for (var i = 0; i < 3 && i < vertexesNumber; ++i) {
        currentPoint = getRandomPoint();
        polygonPoints[polygonPoints.length] = currentPoint;
        previousPoint = currentPoint;
    }

    check:
        while (polygonPoints.length < vertexesNumber) {

            currentPoint = getRandomPoint();
            var currentLine = new Line(previousPoint, currentPoint);
            var lastLine = new Line(currentPoint, polygonPoints[0]);

            for (var j = 0; j < polygonPoints.length - 1; ++j) {

                var polygonLine = new Line(polygonPoints[j], polygonPoints[j + 1]);

                if (j != polygonPoints.length - 2 && polygonLine.crossedBy(currentLine)) {
                    continue check;
                } else if (j != 0 && polygonLine.crossedBy(lastLine)) {
                    continue check;
                }
            }

            polygonPoints[polygonPoints.length] = currentPoint;
            previousPoint = currentPoint;
        }
    return new SimplePolygon(polygonPoints);
}

function getConvexPolygon(vertexesNumber) {
    var polygonPoints = [];
    var randomPoint = null;
    var currentPoint = null;
    var previousPoint = null;

    for (var i = 0; i < 2 && i < vertexesNumber; ++i) {
        previousPoint = currentPoint;

        randomPoint = getRandomPoint();
        polygonPoints[polygonPoints.length] = randomPoint;

        currentPoint = randomPoint;
    }

    var firstLine, currentLine, lastLine;

    while (polygonPoints.length < vertexesNumber) {

        randomPoint = getRandomPoint();
        firstLine = new Line(polygonPoints[0], polygonPoints[1]);
        currentLine = new Line(previousPoint, currentPoint);
        lastLine = new Line(currentPoint, polygonPoints[0]);

        if (randomPoint.onTheRightSideOf(firstLine) &&
            randomPoint.onTheRightSideOf(currentLine) &&
            randomPoint.onTheLeftSideOf(lastLine)) {

            polygonPoints[polygonPoints.length] = randomPoint;
            previousPoint = currentPoint;
            currentPoint = randomPoint;
        }
    }

    return new ConvexPolygon(polygonPoints);
}

function getSimplePolygonInsideConvex(vertexesNumber, convexPolygon) {
    var polygonPoints = [];
    var currentPoint, previousPoint;

    for (var i = 0; i < 3 && i < vertexesNumber; ++i) {
        currentPoint = getRandomPoint();
        if (convexPolygon.has(currentPoint)) {

            polygonPoints[polygonPoints.length] = currentPoint;
            previousPoint = currentPoint;
        }
    }

    check:
        while (polygonPoints.length < vertexesNumber) {

            currentPoint = getRandomPoint();

            if (convexPolygon.has(currentPoint)) {

                var currentLine = new Line(previousPoint, currentPoint);
                var lastLine = new Line(currentPoint, polygonPoints[0]);

                for (var j = 0; j < polygonPoints.length - 1; ++j) {

                    var polygonLine = new Line(polygonPoints[j], polygonPoints[j + 1]);

                    if (j != polygonPoints.length - 2 && polygonLine.crossedBy(currentLine)) {
                        continue check;
                    } else if (j != 0 && polygonLine.crossedBy(lastLine)) {
                        continue check;
                    }
                }

                polygonPoints[polygonPoints.length] = currentPoint;
                previousPoint = currentPoint;
            }
        }
    return new SimplePolygon(polygonPoints);
}

/*****************************     Polygon     *****************************/