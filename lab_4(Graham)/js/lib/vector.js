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

    this.length = function () {
        return Math.sqrt(x * x + y * y);
    };

    this.angleBetween = function(vector){
        var cos = (this.dot(vector)) / (this.length() * vector.length());
        return Math.acos(cos);
    };

    this.normalize = function(){
        var k = this.length();
        this.x /= k;
        this.y /= k;
    }
}