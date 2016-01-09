/*****************************      Closest Pairs   *****************************/
function getClosestPairs(points, min) {
    var minDistance = min;
    var pairs = [];

    // debugger;

    points.sort(compareByX);

    findClosestPairs(points);

    return pairs;

    function findClosestPairs(points) {
        if (points.length > 2) {
            var middle = Math.floor(points.length / 2);

            var leftPoints = points.slice(0, middle);
            var rightPoints = points.slice(middle, points.length);

            findClosestPairs(leftPoints);
            findClosestPairs(rightPoints);

            var borderedPoints = [];
            var middleX = points[middle].x;

            var i = leftPoints.length - 1;
            while (i >= 0 && (leftPoints[i].x > middleX - minDistance)) {
                borderedPoints.push(leftPoints[i]);
                --i;
            }

            i = 0;
            while (i < rightPoints.length && (rightPoints[i].x < middleX + minDistance)) {
                borderedPoints.push(rightPoints[i]);
                ++i;
            }

            for (i = 0; i < borderedPoints.length; ++i) {
                for (var j = i + 1; j < borderedPoints.length; ++j) {
                    if (distance(borderedPoints[i], borderedPoints[j]) < minDistance) {
                        pairs.push([borderedPoints[i], borderedPoints[j]]);
                    }
                }
            }
        } else if (points.length == 2) {
            if (distance(points[0], points[1]) < minDistance) {
                pairs.push([points[0], points[1]]);
            }
        }
    }
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


/*****************************     Closest Pairs     *****************************/

