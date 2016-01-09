var STEP = 0.005;
var T = -STEP;

function nextCurvePoint() {
    var point = beziePoint();
    if (T >= 1) {
        return null;
    } else {
        return point;
    }
}

function beziePoint() {
    if (T > 1) {
        T = 1;
    }
    T += STEP;
    return (r(POINTS.length - 2, 0).multiply(1 - T)).add(r(POINTS.length - 2, 1).multiply(T));
}


function r(n, i) {
    if (n == 0) {
        return POINTS[i];
    }
    return (r(n - 1, i).multiply(1 - T)).add(r(n - 1, i + 1).multiply(T));
}