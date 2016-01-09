var app = new App(ctx);

/*************************************** pre-App *********************************/
var POINTS = [];
var RADIUS = 3;

document.getElementById('start-button').addEventListener('click', function () {
    app.layer.setLogic(logic);
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


var SPLINE_ITEMS = 0;
function logic() {
    var point = nextSplinePoint();
    if (point != null) {
        var circle = new Circle(point, RADIUS);
        circle.setStyle({
            fill: 'rgba(253,165,087,0.5)',
            stroke: 'rgba(0,0,0,0)'
        });

        app.layer.add('spline_circle_' + SPLINE_ITEMS, circle);
        ++SPLINE_ITEMS;
    }
}