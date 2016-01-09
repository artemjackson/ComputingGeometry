var CURRENT_INTERPOLATION_NODE = null;
var CURRENT_FUNCTION_VALUE = null;
var CURRENT_POINT_INDEX = 0;
var STEP = 1;

function nextSplinePoint() {
    if (CURRENT_POINT_INDEX < POINTS.length - 1) {
        CURRENT_INTERPOLATION_NODE = nextInterpolationNode();
        CURRENT_FUNCTION_VALUE = functionValueInCurrentNode();
        return new Point(CURRENT_INTERPOLATION_NODE, CURRENT_FUNCTION_VALUE);
    } else if (CURRENT_POINT_INDEX == POINTS.length - 1) {
        ++CURRENT_POINT_INDEX;
        return POINTS[POINTS.length - 1];
    } else {
        return null;
    }

}

function nextInterpolationNode() {
    if (CURRENT_INTERPOLATION_NODE == null) {
        CURRENT_INTERPOLATION_NODE = POINTS[0].x;
    }
    if (CURRENT_INTERPOLATION_NODE < POINTS[CURRENT_POINT_INDEX + 1].x) {
        return CURRENT_INTERPOLATION_NODE += STEP;
    } else {
        return CURRENT_INTERPOLATION_NODE -= STEP;
    }

}

function functionValueInCurrentNode() {
    if (CURRENT_FUNCTION_VALUE == null) {
        CURRENT_FUNCTION_VALUE = POINTS[0].y;
    }

    if (almostEquals(CURRENT_INTERPOLATION_NODE, POINTS[CURRENT_POINT_INDEX + 1].x) && almostEquals(CURRENT_FUNCTION_VALUE, POINTS[CURRENT_POINT_INDEX + 1].y)) {
        CURRENT_POINT_INDEX++;
        CURRENT_INTERPOLATION_NODE = POINTS[CURRENT_POINT_INDEX].x;
        CURRENT_FUNCTION_VALUE = POINTS[CURRENT_POINT_INDEX].y;
    }

    var p_i = POINTS[CURRENT_POINT_INDEX];
    var p_j = POINTS[CURRENT_POINT_INDEX + 1];
    var t = getT(CURRENT_INTERPOLATION_NODE);

    return a(t) * p_i.y
         + b(t) * q1()
         + c(t) * p_j.y
         + d(t) * q2();
}


function a(t) {
    return 2 * (t * t * t) - 3 * (t * t) + 1;
}

function b(t) {
    return (t * t * t) - 2 * (t * t) + t;
}

function c(t) {
    return 3 * (t * t) - 2 * (t * t * t);
}

function d(t) {
    return (t * t * t) - (t * t);
}

function q1() {
    var p1;
    var p2;

    if (CURRENT_POINT_INDEX == 0) {
        p1 = POINTS[CURRENT_POINT_INDEX];
        p2 = POINTS[CURRENT_POINT_INDEX + 1];
    } else {
        p1 = POINTS[CURRENT_POINT_INDEX - 1];
        p2 = POINTS[CURRENT_POINT_INDEX + 1];
    }

    return (p2.y - p1.y) / (getT(p2.x) - getT(p1.x));
}

function q2() {
    var p1;
    var p2;

    if (CURRENT_POINT_INDEX > POINTS.length - 3) {
        p1 = POINTS[CURRENT_POINT_INDEX];
        p2 = POINTS[CURRENT_POINT_INDEX + 1];
    } else {
        p1 = POINTS[CURRENT_POINT_INDEX];
        p2 = POINTS[CURRENT_POINT_INDEX + 2];
    }

    return (p2.y - p1.y) / (getT(p2.x) - getT(p1.x));
}

function getT(x) {
    return (x - POINTS[CURRENT_POINT_INDEX].x) / (POINTS[CURRENT_POINT_INDEX + 1].x - POINTS[CURRENT_POINT_INDEX].x);
}

var EPSILON = STEP;
function almostEquals(x, y) {
    return Math.abs(x - y) <= EPSILON;
}