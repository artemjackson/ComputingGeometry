function getShell(points) {
    var shell = [];

    var point0 = getExtremePoint(points);
    sortByAngle(points);

    for (var j = 0; j < points.length; ++j) {
        var angle = getPolarAngle(points[j]);
    }

    shell.push(point0);
    shell.push(points[1]);

    for (var i = 2; i < points.length; ++i) {
        while (!isLeftAngle(shell[shell.length - 2], shell[shell.length - 1], points[i])) {
            shell.pop();
        }
        shell.push(points[i]);
    }

    return shell;

    function sortByAngle(points) {
        points.sort(compareByAngle);
    }

    function compareByDistance(point1, point2) {
        var distance1 = distance(point0, point1);
        var distance2 = distance(point0, point2);

        if (distance1 < distance2) {
            return -1;
        } else if (distance1 > distance2) {
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

    function compareByAngle(point1, point2) {
        var angle1 = getPolarAngle(point1);
        var angle2 = getPolarAngle(point2);

        if (angle1 < angle2) {
            return -1;
        } else if (angle1 > angle2) {
            return 1;
        } else {
            return compareByDistance(point1, point2);
        }
    }
}

function isLeftAngle(a, b, c) {
    var u = new Vector(b.x - a.x, b.y - a.y);
    var v = new Vector(c.x - a.x, c.y - a.y);
    return (u.x * v.y - u.y * v.x) >= 0;
}

function getExtremePoint(points) {
    sortByY(points);
    return points[0];
}

function sortByY(points) {
    points.sort(compareByY);
}

function compareByY(point1, point2) {
    if (point1.y < point2.y) {
        return -1;
    } else if (point1.y > point2.y) {
        return 1;
    } else {
        return compareByX(point1, point2);
    }
}

function compareByX(point1, point2) {
    if (point1.x < point2.x) {
        return -1;
    } else if (point1.x > point2.x) {
        return 1;
    } else {
        return 0;
    }
}