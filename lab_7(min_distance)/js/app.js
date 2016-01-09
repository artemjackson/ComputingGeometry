var RADIUS = 20;
var MIN_DISTANCE = 2 * RADIUS;

var app = new App(ctx);

document.getElementById('stop-button').addEventListener('click', function () {
    app.stop();
    return false;
});

document.getElementById('start-button').addEventListener('click', function () {
    app.start();
    return false;
});


/************************************** App ****************************************/
var convexPolygon = new ConvexPolygon([new Point(100, 100), new Point(100, 620), new Point(980, 620), new Point(980, 100)]);
convexPolygon.setStyle({stroke: '#628DAE', fill: '#5A5A5A', width: '8'});
app.layer.add('convexPolygon', convexPolygon);

for (var i = 0; i < 10; ++i) {
    app.layer.add('circle_' + i, randomCircle());
}

app.layer.setLogic(function (time) {
    var centers = [];
    for (var index in this.items) {
        if (this.items.hasOwnProperty(index)) {
            if (this.items[index] instanceof Line) {
                app.layer.remove(index);
            }

            if (this.items[index] instanceof Circle) {
                if (!this.items.convexPolygon.has(this.items[index].center)) {
                    var sides = this.items.convexPolygon.getSides();

                    for (var i = 0; i < sides.length; ++i) {
                        var side = sides[i];
                        if (this.items[index].center.onTheLeftSideOf(side)) {
                            var vector = new Vector(side.start.x - side.end.x, side.start.y - side.end.y);
                            this.items[index].center.reflectFrom(vector);
                            break;
                        }
                    }
                }
                centers[centers.length] = this.items[index].center;
            }
        }
    }
    var pairs = getClosestPairs(centers, MIN_DISTANCE);
    for (i = 0; i < pairs.length; ++i) {
        solveContact(pairs[i][0], pairs[i][1]);
    }

    /*
    pairs = getClosestPairs(centers, 2 * MIN_DISTANCE);
    for (i = 0; i < pairs.length; ++i) {
        var line = new Line(pairs[i][0], pairs[i][1]);
        line.setStroke('#628DAE');
        line.setWidth('3');
        app.layer.add('line_' + i, line);
    }*/
});

app.start();

/************************************** App ****************************************/
function solveContact(point1, point2) {
    var normal = (new Vector(point1.x - point2.x, point1.y - point2.y)).normalized();
    var relSped = point1.speed.subtruct(point2.speed);
    var initialVelProj = normal.dot(point1.speed) + (normal.reverse()).dot(point2.speed);
    var relVelProj = relSped.dot(normal);

    if (relVelProj == -initialVelProj) {
        return;
    }

    var a = (normal.dot(point1.speed)) + ((normal.reverse()).dot(point2.speed)) + initialVelProj;
    var b = 2 * normal.length() * normal.length();

    var lambda = -a / b;

    if (lambda < 0) {
        lambda = 0;
    }

    point1.speed = point1.speed.add(normal.multiply(lambda));
    point2.speed = point2.speed.add((normal.reverse()).multiply(lambda));
}

function randomCircle() {
    var circle = null;

    while (!circle) {
        var point = getRandomPoint();

        if (convexPolygon.has(point)) {
            circle = new Circle(point, RADIUS);
            circle.center.speed = new Vector(getRandomArbitrary(-40, 40), getRandomArbitrary(-40, 40));
            circle.setStyle({fill: '#AC87BF'});
        }
    }

    return circle;
}

