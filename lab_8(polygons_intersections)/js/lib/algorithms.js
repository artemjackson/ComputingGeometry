/*****************************      Convex Polygons Intersection   *****************************/
function getIntersection(polygon1, polygon2) {
    var intersection = [];
    var P = polygon1.getSides();
    var Q = polygon2.getSides();

    var p = 0;
    var q = 0;

    var firstIntersectPoint = null;

    for (var i = 0; !firstIntersectPoint && (i < (P.length + Q.length)); ++i) {
        var pAimsQ = P[p].aimsAt(Q[q]);
        var qAimsP = Q[q].aimsAt(P[p]);

        if (pAimsQ && qAimsP) {                 // 1-st
            if (pOutsideQ(P[p], Q[q])) {
                p = (p + 1) % P.length;
            } else {
                q = (q + 1) % Q.length;
            }

        } else if (pAimsQ && !qAimsP) {         // 2-nd
            if (!pOutsideQ(P[p], Q[q])) {
                firstIntersectPoint = P[p].end;
            }
            p = (p + 1) % P.length;

        } else if (qAimsP && !pAimsQ) {         //3-rd
            if (!qOutsideP(Q[q], P[p])) {
                firstIntersectPoint = Q[q].end;
            }
            q = (q + 1) % Q.length;

        } else if (!pAimsQ && !qAimsP) {         //4-th
            if (P[p].crossedBy(Q[q])) {
                var crossPoint = getCrossPoint(P[p], Q[q]);
                firstIntersectPoint = crossPoint;
            }
            if (pOutsideQ(P[p], Q[q])) {
                p = (p + 1) % P.length;
            } else {
                q = (q + 1) % Q.length;
            }
        }
    }

    var currentIntersectPoint = null;

    for (i = 0; (firstIntersectPoint != currentIntersectPoint) && (i < (P.length + Q.length)); ++i) {
        pAimsQ = P[p].aimsAt(Q[q]);
        qAimsP = Q[q].aimsAt(P[p]);

        if (pAimsQ && qAimsP) {                 // 1-st
            if (pOutsideQ(P[p], Q[q])) {
                p = (p + 1) % P.length;
            } else {
                q = (q + 1) % Q.length;
            }

        } else if (pAimsQ && !qAimsP) {         // 2-nd
            if (!pOutsideQ(P[p], Q[q])) {
                currentIntersectPoint = P[p].end;
                intersection.push(P[p].end);
            }
            p = (p + 1) % P.length;

        } else if (qAimsP && !pAimsQ) {         //3-rd
            if (!qOutsideP(Q[q], P[p])) {
                currentIntersectPoint = Q[q].end;
                intersection.push(Q[q].end);
            }
            q = (q + 1) % Q.length;

        } else if (!pAimsQ && !qAimsP) {         //4-th
            if (P[p].crossedBy(Q[q])) {
                crossPoint = getCrossPoint(P[p], Q[q]);
                currentIntersectPoint = crossPoint;
                intersection.push(crossPoint);
            }
            if (pOutsideQ(P[p], Q[q])) {
                p = (p + 1) % P.length;
            } else {
                q = (q + 1) % Q.length;
            }
        }
    }

    return intersection;
}

function getCrossPoint(line1, line2) {
    var a = new Vector(line1.end.x - line1.start.x, line1.end.y - line1.start.y);
    var b = new Vector(line2.end.x - line2.start.x, line2.end.y - line2.start.y);
    var c = new Vector(line2.start.x - line1.start.x, line2.start.y - line1.start.y);

    var n = b.normal();

    var t = c.dot(n) / a.dot(n);

    var p_x = line1.start.x * (1 - t) + line1.end.x * t;
    var p_y = line1.start.y * (1 - t) + line1.end.y * t;

    return new Point(p_x, p_y);
}

function pOutsideQ(pSide, qSide) {
    return pSide.end.onTheLeftSideOf(qSide);
}

function qOutsideP(qSide, pSide) {
    return pOutsideQ(qSide, pSide);
}
/*****************************     Convex Polygons Intersection     *****************************/

















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

