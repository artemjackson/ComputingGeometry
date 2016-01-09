var NUMBER = 4;

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

var border = new ConvexPolygon([new Point(100, 100), new Point(100, 620), new Point(980, 620), new Point(980, 100)]);
border.setStyle({

    fill: 'rgba(0,0,0,0.0)',
    stroke: '#628DAE',
    width: '4'

});
app.layer.add('border', border);

for (var i = 0; i < NUMBER; ++i) {
    app.layer.add('circle_' + i, randomCircle('#3CB35B'));
}

for (i = NUMBER ; i < 2 * NUMBER; ++i) {
    app.layer.add('circle_' + i, randomCircle('#A17EB3'));
}

app.layer.setLogic(function (time) {
    var set1 = [];
    var set2 = [];
    for (var index in this.items) {
        if (this.items.hasOwnProperty(index)) {

            if (this.items[index] instanceof Circle) {
                if (!this.items.border.has(this.items[index].center)) {
                    var sides = this.items.border.getSides();

                    for (var i = 0; i < sides.length; ++i) {
                        var side = sides[i];
                        if (this.items[index].center.onTheLeftSideOf(side)) {
                            var vector = new Vector(side.start.x - side.end.x, side.start.y - side.end.y);
                            this.items[index].center.reflectFrom(vector);
                            break;
                        }
                    }
                }
                if (set1.length < NUMBER) {
                    set1[set1.length] = this.items[index].center;
                } else {
                    set2[set2.length] = this.items[index].center;
                }
            }
        }
    }
    var shell_1 = new ConvexPolygon(getShell(set1));

    shell_1.setStyle(
        {
            fill: 'rgba(0,0,0,0.0)',
            stroke: '#3CB35B',
            width: '4'
        });
    app.layer.add('shell_1', shell_1);


    var shell_2 = new ConvexPolygon(getShell(set2));
    shell_2.setStyle({
        fill: 'rgba(0,0,0,0.0)',
        stroke: '#A17EB3',
        width: '4'
    });

    app.layer.add('shell_2', shell_2);

    var intersection = new ConvexPolygon(getIntersection(shell_1, shell_2));
    intersection.setStyle({
        fill: 'rgba(253,165,087,0.5)',
        stroke: 'rgba(0,0,0,0.0)'
    });
    app.layer.add('intersection', intersection);
});

app.start();

/************************************** App ****************************************/
function randomCircle(color) {

    var circle = null;

    while (!circle) {
        var point = getRandomPoint();

        if (border.has(point)) {
            circle = new Circle(point, 4);
            circle.center.speed = new Vector(getRandomArbitrary(-15, 15), getRandomArbitrary(-15, 15));
            circle.setStyle({fill: color});
        }
    }

    return circle;
}
