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
app.layer.add('cube', createCube());
app.start();

/************************************** App ****************************************/
function createCube() {
    var p1 = new Point3D(-100, 100, -100);
    var p2 = new Point3D(-100, 100, 100);
    var p3 = new Point3D(100, 100, 100);
    var p4 = new Point3D(100, 100, -100);

    var p5 = new Point3D(-100, -100, -100);
    var p6 = new Point3D(-100, -100, 100);
    var p7 = new Point3D(100, -100, 100);
    var p8 = new Point3D(100, -100, -100);

    var cube = new Cube([p1, p2, p3, p4, p5, p6, p7, p8]);
    cube.setStyle({
        //stroke: '#A17EB3',
        width: '4'
    });

    cube.orientation = new Quaternion(new Vector3D(0.0001, 0.0005, 0), 1);
    cube.orientation.normalize();

    return cube;
}
