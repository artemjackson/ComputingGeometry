function Vector(x, y) {

    this.x = x;
    this.y = y;

    this.multiply = function (number) {
        return new Vector(this.x * number, this.y * number);
    };

    this.add = function (vector) {
        return new Vector(this.x + vector.x, this.y + vector.y);
    };

    this.subtruct = function (vector) {
        return new Vector(this.x - vector.x, this.y - vector.y);
    };

    this.divide = function (number) {
        return new Vector(this.x / number, this.y / number);
    };

    this.dot = function (vector) {
        return this.x * vector.x + this.y * vector.y;
    };

    this.normal = function () {
        return new Vector(-this.y, this.x);
    };

    this.normalized = function () {
        return new Vector(this.x / this.length(), this.y / this.length());
    };

    this.length = function () {
        return Math.sqrt(x * x + y * y);
    };

    this.reverse = function () {
        return new Vector(-this.x, -this.y);
    };

    this.isNull = function () {
        return this.length() == 0;
    };

    this.isCollinearTo = function (vector) {
        var a = this;
        var b = vector;
        return determinant(a.x, a.y, b.x, b.y) == 0;
    };

    this.angleBetween = function (vector) {
        if (this.isNull() || vector.isNull()) {
            return 0;
        }

        var cos = (this.dot(vector)) / (this.length() * vector.length());
        return Math.acos(cos);
    };

    this.normalize = function () {
        var k = this.length();
        this.x /= k;
        this.y /= k;
    }
}

function Vector3D(x, y, z) {

    this.x = x;
    this.y = y;
    this.z = z;

    this.multiply = function (number) {
        return new Vector3D(this.x * number, this.y * number, this.z * number);
    };


    this.add = function (vector) {
        return new Vector3D(this.x + vector.x, this.y + vector.y, this.z * vector.z);
    };

    this.subtruct = function (vector) {
        return new Vector3D(this.x - vector.x, this.y - vector.y, this.z - vector.z);
    };

    this.divide = function (number) {
        return new Vector3D(this.x / number, this.y / number, this.z / number);
    };

    this.dot = function (vector) {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    };

    this.normal = function () {
        return new Vector3D(-this.y, this.x, 0);
    };

    this.normalized = function () {
        return new Vector3D(this.x / this.length(), this.y / this.length(), this.z / this.length());
    };

    this.length = function () {
        return Math.sqrt(x * x + y * y + z * z);
    };

    this.reverse = function () {
        return new Vector3D(-this.x, -this.y, -this.z);
    };

    this.isNull = function () {
        return this.length() == 0;
    };

    this.angleBetween = function (vector) {
        if (this.isNull() || vector.isNull()) {
            return 0;
        }

        var cos = (this.dot(vector)) / (this.length() * vector.length());
        return Math.acos(cos);
    };

    this.normalize = function () {
        var k = this.length();
        this.x /= k;
        this.y /= k;
        this.z /= k;
    }
}

/***************************** Quaternion ***************************************/
function Quaternion(vector, angle) {
    this.vector = vector;
    this.angle = angle;

    this.multiply = function (number) {
        var x = this.vector.x * number;
        var y = this.vector.y * number;
        var z = this.vector.z * number;
        var w = this.angle * number;
        return new Quaternion(new Vector3D(x, y, z), w);
    };

    this.multiplyByQuaternion = function (quaternion) {
        var x = this.vector.x * quaternion.vector.x;
        var y = this.vector.y * quaternion.vector.y;
        var z = this.vector.z * quaternion.vector.z;
        var w = this.angle * quaternion.angle;
        return new Quaternion(new Vector3D(x, y, z), w);
    };

    this.multiplyByVector = function (vector) {
        var x = this.vector.x * vector.x;
        var y = this.vector.y * vector.y;
        var z = this.vector.z * vector.z;
        return new Quaternion(new Vector3D(x, y, z), 0);
    };

    this.add = function (quaternion) {
        var x = this.vector.x + quaternion.vector.x;
        var y = this.vector.y + quaternion.vector.y;
        var z = this.vector.z + quaternion.vector.z;
        var w = this.angle + quaternion.angle;
        return new Quaternion(new Vector3D(x, y, z), w);
    };

    this.reverse = function () {
        return new Quaternion(this.vector.reverse(), this.angle);
    };

    this.normalize = function () {
        var x = this.vector.x;
        var y = this.vector.y;
        var z = this.vector.z;
        var w = this.angle;

        var k = Math.sqrt(x * x + y * y + z * z + w * w);

        x /= k;
        y /= k;
        z /= k;
        w /= k;

        this.vector = new Vector3D(x, y, z);
        this.angle = w;
    };

    this.toMatrix = function () {
        var x = this.vector.x;
        var y = this.vector.y;
        var z = this.vector.z;
        var w = this.angle;

        var a11 = 1 - 2 * (y * y + z * z);
        var a12 = 2 * (x * y + z * w);
        var a13 = 2 * (x * z - y * w);

        var a21 = 2 * (x * y - z * w);
        var a22 = 1 - 2 * (x * x + z * z);
        var a23 = 2 * (z * y + x * w);

        var a31 = 2 * (x * z + y * w);
        var a32 = 2 * (y * z - x * w);
        var a33 = 1 - 2 * (x * x + y * y);

        return new Matrix3x3([a11, a12, a13, a21, a22, a23, a31, a32, a33]);
    }
}
/***************************** Quaternion ***************************************/


/******************************* Matrix3x3 ***************************************/
function Matrix3x3(elements) {
    this.matrix = elements;

    this.multiply = function (point3D) {
        var matrix = this.matrix;
        var x = matrix[0] * point3D.x + matrix[1] * point3D.y + matrix[2] * point3D.z;
        var y = matrix[3] * point3D.x + matrix[4] * point3D.y + matrix[5] * point3D.z;
        var z = matrix[6] * point3D.x + matrix[7] * point3D.y + matrix[8] * point3D.z;

        return new Point3D(x, y, z);
    }
}

/******************************* Matrix3x3 ***************************************/