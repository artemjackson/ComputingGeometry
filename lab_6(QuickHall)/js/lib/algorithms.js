/*****************************     Quick Hall    *****************************/
function getShell(points) {
    var shell = [];
    points.sort(compareByX);

    var left = points[0];
    var right = points[points.length - 1];

    var separator = new Line(left, right);

    var rightSet = [];
    var leftSet = [];

    for (var i = 0; i < points.length; ++i) {
        if (points[i].onTheRightSideOf(separator)) {
            rightSet[rightSet.length] = points[i];
        } else {
            leftSet[leftSet.length] = points[i];
        }
    }

    var reverseSeparator = new Line(separator.end, separator.start);

    quckhull(separator, leftSet);
    quckhull(reverseSeparator, rightSet);

    return shell;

    function quckhull(separator, points) {

        if (points.length != 0) {
            var maxSquare = 0;
            var shellPoint = 0;

            for (var i = 0; i < points.length; ++i) {
                var currentSquare = square(separator.start, separator.end, points[i]);
                if (currentSquare > maxSquare) {
                    maxSquare = currentSquare;
                    shellPoint = i;
                }
            }

            var separator1 = new Line(separator.start, points[shellPoint]);
            var separator2 = new Line(points[shellPoint], separator.end);

            var leftSet1 = [];
            var leftSet2 = [];

            for (i = 0; i < points.length; ++i) {
                if (points[i].onTheLeftSideOf(separator1)) {
                    leftSet1[leftSet1.length] = points[i];
                } else if (points[i].onTheLeftSideOf(separator2)) {
                    leftSet2[leftSet2.length] = points[i];
                }
            }

            quckhull(separator1, leftSet1);
            quckhull(separator2, leftSet2);
        } else {
            shell.push(separator.end);
        }
    }
}

function quckhull(separator, points) {

    if (points.length > 1) {
        var maxSquare = 0;
        var shellPoint = 0;

        for (var i = 0; i < points.length; ++i) {
            var currentSquare = square(separator.start, separator.end, points[i]);
            if (currentSquare > maxSquare) {
                maxSquare = currentSquare;
                shellPoint = i;
            }
        }

        var separator1 = new Line(separator.start, points[i]);
        var separator2 = new Line(points[i], separator.end);

        var leftSet1 = [];
        var leftSet2 = [];

        for (i = 0; i < points.length; ++i) {
            if (points[i].onTheLeftSideOf(separator1)) {
                leftSet1[leftSet1.length] = points[i];
            } else if (points[i].onTheLeftSideOf(separator2)) {
                leftSet2[leftSet2.length] = points[i];
            }
        }

        quckhull(separator1, leftSet1);
        quckhull(separator2, leftSet2);
    } else {
        shell.push(separator.end);
    }
}

function square(a, b, c) {
    var u = new Vector(b.x - a.x, b.y - a.y);
    var v = new Vector(c.x - a.x, c.y - a.y);
    return Math.abs(u.x * v.y - u.y * v.x);
}

function compareByX(point1, point2) {
    if (point1.x < point2.x) {
        return -1;
    } else if (point1.x > point2.x) {
        return 1;
    } else {
        return 0
    }
}


/*****************************     Quick Hall     *****************************/

