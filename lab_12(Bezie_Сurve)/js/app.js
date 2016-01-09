var app = new App(ctx);

/*************************************** pre-App *********************************/
var POINTS = [];
var RADIUS = 2;

document.getElementById('start-button').addEventListener('click', function () {
    app.layer.setLogic(logic);
    draw_basises();
    return false;
});

document.getElementById('stop-button').addEventListener('click', function () {
    app.stop();
    return false;
});

canvas.addEventListener("mousedown", getPosition, false);

function getPosition(event) {
    var x = event.x;
    var y = event.y;

    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    var point = new Point(x, y);
    POINTS[POINTS.length] = point;
    var circle = new Circle(point, RADIUS);
    circle.setStyle({fill: 'rgba(253,165,087,0.5)'});
    app.layer.add('circle_' + POINTS.length, circle);
    var marker = new Circle(point, 3 * RADIUS);
    marker.setStyle({fill: 'rgba(256,256,256, 0.0)', stroke: 'red'});

    app.layer.add('circle_marker' + POINTS.length, marker);
}
/*************************************** pre-App *********************************/


/************************************** App ****************************************/
app.start();
/************************************** App ****************************************/


var CURVE_ITEMS = 0;
function logic() {
    var point = nextCurvePoint();
    if (point != null) {
        var circle = new Circle(point, RADIUS);
        circle.setStyle({
            fill: 'rgba(253,165,087,1)',
            stroke: 'rgba(0,0,0,0)'
        });

        app.layer.add('spline_circle_' + CURVE_ITEMS, circle);
        ++CURVE_ITEMS;
    } else {
        app.stop();
    }
}


var BASIS_ITEMS = 0;

function draw_basises() {
    //  debugger;
    var step = 0.005;
    var n = POINTS.length - 1;
    var color;

    for (var i = 0; i <= n; ++i) {
        color = randomColor();
        for (var t = 0; t <= 1; t += step) {
            var point = new Point(t * MAX_X_VALUE, MAX_Y_VALUE - b(i, n) * MAX_Y_VALUE);
            var circle = new Circle(point, RADIUS);
            circle.setStyle({
                fill: color,
                stroke: 'rgba(0,0,0,0)'
            });
            app.layer.add('basis_' + BASIS_ITEMS, circle);
            BASIS_ITEMS++;

            function b(i, n) {
                return c(i, n) * Math.pow(t, i) * Math.pow(1 - t, n - i);
            }
        }
    }
}

function c(i, n) {
    return factorial(n) / (factorial(i) * factorial(n - i));
}
var f = [];
function factorial(n) {
    if (n == 0 || n == 1)
        return 1;
    if (f[n] > 0)
        return f[n];
    return f[n] = factorial(n - 1) * n;
}


