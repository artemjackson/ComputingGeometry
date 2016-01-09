/*****************************     Jarvis Algorithm     *****************************/
function getShell(pointsSet) {
    var points = pointsSet.slice();

    var shell = [];

    var point0 = getExtremePoint(points);
    var previousPoint = new Point(MAX_X_VALUE, point0.y);

    shell[0] = previousPoint;
    shell[1] = point0;

    var currentPoint = point0;

    do {
        currentPoint = next();
        shell[shell.length] = currentPoint;

    }
    while (currentPoint != point0);

    shell.splice(0, 1);      // removing previous point
    shell.pop();            // removing duplicated point0

    return shell;

    function next() {

        points.sort(compareByAngle);
        var needed = points[0];
        points.splice(0, 1);

        return needed;

        function compareByAngle(point1, point2) {
            var currentSegment = new Vector(shell[shell.length - 2].x - shell[shell.length - 1].x, shell[shell.length - 2].y - shell[shell.length - 1].y);
            var challenger1 = new Vector(point1.x - shell[shell.length - 1].x, point1.y - shell[shell.length - 1].y);
            var challenger2 = new Vector(point2.x - shell[shell.length - 1].x, point2.y - shell[shell.length - 1].y);

            var angle1 = currentSegment.angleBetween(challenger1);
            var angle2 = currentSegment.angleBetween(challenger2);

            if (angle1 > angle2) {
                return -1;
            } else if (angle1 < angle2) {
                return 1;
            } else {
                return 0;
            }
        }
    }

    function compareByPolarAngle(point1, point2) {
        var angle1 = getPolarAngle(point1);
        var angle2 = getPolarAngle(point2);

        if (angle1 < angle2) {
            return -1;
        } else if (angle1 > angle2) {
            return 1;
        } else {
            return 0;
        }
    }

    function getPolarAngle(point) {
        var polarAxis = new Vector(MAX_X_VALUE, 0);
        var ray = new Vector(point.x - point0.x, point.y - point0.y);
        return polarAxis.angleBetween(ray);
    }

}

function getExtremePoint(points) {
    sortByX(points);
    return points[0];
}

function sortByX(points) {
    points.sort(compareByX);
}

function compareByX(point1, point2) {
    if (point1.x < point2.x) {
        return -1;
    } else if (point1.x > point2.x) {
        return 1;
    } else {
        compareByY(point1, point2)
    }
}

function compareByY(point1, point2) {
    if (point1.y < point2.y) {
        return -1;
    } else if (point1.y > point2.y) {
        return 1;
    } else {
        return 0;
    }
}
/*****************************     Jarvis Algorithm     *****************************/


/*****************************     Diameter Searching     *****************************/
function getDiameter(shell) {
    debugger;
    var p = 0;
    var i = 1;
    var h = shell.length - 1;

    var start = null;
    var end = null;

    var previousSquare = -1;
    var diameters = [];

    var currentSquare = square(shell[h], shell[p], shell[i]);
    while (currentSquare > previousSquare) {
        previousSquare = currentSquare;
        i++;
        currentSquare = square(shell[h], shell[p], shell[i]);
    }

    start = i - 1;
    i = start;
    previousSquare = -1;

    while (end < h) {
        currentSquare = square(shell[p], shell[p + 1], shell[i]);
        while (currentSquare > previousSquare) {
            previousSquare = currentSquare;
            i++;
            currentSquare = square(shell[p], shell[p + 1], shell[i % (h + 1)]);
        }

        end = i - 1;


        var candidates = [];
        for (var j = start; j <= end && j <= h; ++j) {
            candidates[candidates.length] = shell[j];
        }
        diameters[diameters.length] = new Line(shell[p], getFarthest(candidates));


        p++;
        start = end;
        i = start;
        previousSquare = -1;
    }

    var winner = diameters[0];
    for (i = 1; i < diameters.length; ++i) {
        if (winner.length() < diameters[i].length()) {
            winner = diameters[i];
        }
    }

    return winner;

    function getFarthest(points) {
        var farthest = points[0];

        for (var i = 1; i < points.length; ++i) {
            if (distance(shell[p], farthest) < distance(shell[p], points[i])) {
                farthest = points[i];
            }
        }
        return farthest;
    }

    function square(a, b, c) {
        var u = new Vector(b.x - a.x, b.y - a.y);
        var v = new Vector(c.x - a.x, c.y - a.y);
        return Math.abs(u.x * v.y - u.y * v.x);
    }
}
/*****************************     Diameter Searching     *****************************/
