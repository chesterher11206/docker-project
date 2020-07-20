"use strict";
;
;
var mm = {
    name: 'Martin',
    hasPet: true,
    age: 10
};
var martin = {
    name: 'Martin',
    hasPet: true,
};
var a = {
    123: 'a',
    3: 'b'
};
console.log(martin.age);
var F = function (p1) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (typeof p1 === 'number' &&
        args instanceof Array) {
        return args.reduce(function (acc, cur) { return acc + cur; }, p1);
    }
    else if (p1 instanceof Array) {
        return p1.reduce(function (acc, cur) { return acc + cur; }, 0);
    }
    throw new Error('Error');
};
var CircleGeometry = /** @class */ (function () {
    function CircleGeometry(radius) {
        this.radius = radius;
        this.PI = 3.14;
    }
    Object.defineProperty(CircleGeometry.prototype, "area", {
        get: function () {
            return this.PI * (Math.pow(this.radius, 2));
        },
        set: function (value) {
            this.radius = Math.pow((value / this.PI), 0.5);
        },
        enumerable: false,
        configurable: true
    });
    CircleGeometry.prototype.test = function () {
        console.log('hi');
    };
    return CircleGeometry;
}());
var circle = new CircleGeometry(2);
console.log(circle.radius);
console.log(circle.area);
circle.area = 3.14 * (Math.pow(5, 2));
console.log(circle.area);
console.log(circle.radius);
var LazySingletonPerson = /** @class */ (function () {
    function LazySingletonPerson(name, age, hasPet) {
        this.name = name;
        this.age = age;
        this.hasPet = hasPet;
    }
    LazySingletonPerson.getInstance = function () {
        if (this.Instance === null) {
            this.Instance = new LazySingletonPerson('Maxwell', 20, false);
        }
        return this.Instance;
    };
    LazySingletonPerson.Instance = null;
    return LazySingletonPerson;
}());
