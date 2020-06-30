interface Person {
    name: string;
    age: number;
    hasPet: boolean;
};

interface StringTypedList {
    [index: number]: string;
};

type U = Person & StringTypedList;

let mm: U = {
    name: 'Martin',
    hasPet: true,
    age: 10
};

let martin = {
    name: 'Martin',
    hasPet: true,
} as Person;

let a: StringTypedList = {
    123: 'a',
    3: 'b'
};

console.log(martin.age);

interface ISummation {
    (...args: number[]): number;
    (arr: number[]): number;
}

let F: ISummation = function (p1: number | number[], ...args: number[]) {
    if (
        typeof p1 === 'number' &&
        args instanceof Array
    ) {
        return args.reduce((acc, cur) => acc + cur, p1);
    } else if (
        p1 instanceof Array
    ) {
        return p1.reduce((acc, cur) => acc + cur, 0);
    }

    throw new Error('Error');
};

class CircleGeometry {
    private PI: number = 3.14;

    constructor(public radius: number) {}

    get area() {
        return this.PI * (this.radius ** 2)
    }

    set area(value: number) {
        this.radius = (value / this.PI) ** 0.5;
    }

    public test() {
        console.log('hi');
    }
}

const circle = new CircleGeometry(2);
console.log(circle.radius);
console.log(circle.area);
circle.area = 3.14 * (5 ** 2);
console.log(circle.area);
console.log(circle.radius);

class LazySingletonPerson {
    private constructor(
        public readonly name: string,
        public readonly age: number,
        public readonly hasPet: boolean,
    ) {}

    private static Instance: LazySingletonPerson | null = null;

    static getInstance(): LazySingletonPerson {
        if (this.Instance === null) {
            this.Instance = new LazySingletonPerson('Maxwell', 20, false);
        }

        return this.Instance;
    }
}