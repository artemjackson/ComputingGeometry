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

var convexPolygon = getConvexPolygon(5);
convexPolygon.setStyle({stroke: '#617A53', fill: '#5A5A5A', width: '4'});
app.layer.add('convexPolygon', convexPolygon);

var simplePolygon = getSimplePolygonInsideConvex(4, convexPolygon);
simplePolygon.setStyle({stroke: '#B58F55', fill: '#3C3F41', width: '3'});
app.layer.add('simplePolygon', simplePolygon);

for (var i = 0; i < 80; ++i) {
    app.layer.add('circle_' + i, randomCircle());
}

app.start();

/************************************** App ****************************************/

function randomCircle() {
    var circle = null;

    while (!circle) {
        var point = getRandomPoint();

        if (convexPolygon.has(point)) {
            circle = new Circle(point, 4 /* radius */);
            circle.center.speed = new Vector(getRandomArbitrary(-50, 50), getRandomArbitrary(-50, 50));
            circle.setStyle({fill: '#628DAE'});
        }
    }

    return circle;
}

