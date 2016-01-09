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
var convexPolygon = getConvexPolygon(6);
convexPolygon.setStyle({stroke: '#617A53', fill: '#5A5A5A', width: '4'});
app.layer.add('convexPolygon', convexPolygon);

for (var i = 0; i < 10; ++i) {
    app.layer.add('circle_' + i, randomCircle());
}

app.layer.setLogic(function (time) {
    var centers = [];
    for (var index in this.items) {
        if (this.items.hasOwnProperty(index) && this.items[index] instanceof Circle) {

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
    var shellPoints = getShell(centers);
    var shell = new Polygon(shellPoints);
    app.layer.add('shell', shell);
    shell.setFill('rgba(0,0,0,0.0)');
    shell.setStroke('#A88652');

    var diameter = getDiameter(shellPoints);
    app.layer.add('diameter', diameter);
    diameter.setStroke('#AF9652');
    diameter.setWidth(2);

});

app.start();

/************************************** App ****************************************/

function randomCircle() {
    var circle = null;

    while (!circle) {
        var point = getRandomPoint();

        if (convexPolygon.has(point)) {
            circle = new Circle(point, 4 /* radius */);
            circle.center.speed = new Vector(getRandomArbitrary(-50, 50), getRandomArbitrary(-50, 50));
            circle.setStyle({fill: '#A88652'});
        }
    }

    return circle;
}

