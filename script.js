// ============================================================
// Лабораторна робота №2
// Об'єктно-орієнтоване програмування у JavaScript
// ============================================================

// ============================================================
// ЧАСТИНА 1: Без використання класів ES6 (завдання 1.2.3–1.2.10)
// ============================================================

// --- 1.2.3 Створення об'єкта car1 за допомогою new Object() ---
console.log("=== 1.2.3 Об'єкт car1 (new Object()) ===");

var car1 = new Object();
car1.color = "red";
car1.maxSpeed = 220;
car1.driver = new Object();
car1.driver.name = "Misha Kravchenko";
car1.driver.category = "C";
car1.driver["personal limitations"] = "No driving at night";
car1.tuning = true;
car1["number of accidents"] = 0;

console.log(car1);

// --- 1.2.4 Створення об'єкта car2 за допомогою літерала ---
console.log("\n=== 1.2.4 Об'єкт car2 (літерал) ===");

var car2 = {
    color: "blue",
    maxSpeed: 180,
    driver: {
        name: "Misha Kravchenko",
        category: "B",
        "personal limitations": null
    },
    tuning: false,
    "number of accidents": 2
};

console.log(car2);

// --- 1.2.5 Метод drive для car1 ---
console.log("\n=== 1.2.5 Метод drive для car1 ===");

car1.drive = function () {
    console.log("I am not driving at night");
};
car1.drive();

// --- 1.2.6 Метод drive для car2 ---
console.log("\n=== 1.2.6 Метод drive для car2 ===");

car2.drive = function () {
    console.log("I can drive anytime");
};
car2.drive();

// --- 1.2.7 Конструктор Truck ---
// --- 1.2.9 Метод trip у конструкторі ---
console.log("\n=== 1.2.7 & 1.2.9 Конструктор Truck з методом trip ===");

function Truck(color, weight, avgSpeed, brand, model) {
    this.color = color;
    this.weight = weight;
    this.avgSpeed = avgSpeed;
    this.brand = brand;
    this.model = model;

    // 1.2.9 — метод trip
    this.trip = function () {
        if (!this.driver) {
            console.log("No driver assigned");
            return;
        }
        var msg = "Driver " + this.driver.name;
        if (this.driver.nightDriving) {
            msg += " drives at night";
        } else {
            msg += " does not drive at night";
        }
        msg += " and has " + this.driver.experience + " years of experience";
        console.log(msg);
    };
}

// --- 1.2.8 Prototype-метод AssignDriver ---
console.log("\n=== 1.2.8 Прототипний метод AssignDriver ===");

Truck.prototype.AssignDriver = function (name, nightDriving, experience) {
    this.driver = {
        name: name,
        nightDriving: nightDriving,
        experience: experience
    };
};

// --- 1.2.10 Створення 2 об'єктів Truck + демонстрація trip ---
console.log("\n=== 1.2.10 Демонстрація Truck ===");

var truck1 = new Truck("white", 5000, 90.5, "Volvo", "FH16");
var truck2 = new Truck("black", 7000, 80.0, "MAN", "TGX");

console.log("truck1 (без водія):");
truck1.trip();

truck1.AssignDriver("Misha Kravchenko", true, 5);
console.log("\ntruck1 (з водієм, nightDriving = true):");
truck1.trip();

truck2.AssignDriver("Ivan Petrenko", false, 3);
console.log("\ntruck2 (з водієм, nightDriving = false):");
truck2.trip();


// ============================================================
// ЧАСТИНА 2: Класи ES6 (завдання 1.2.12–1.2.24)
// ============================================================

// --- 1.2.12–1.2.15 Клас Square ---
console.log("\n=== 1.2.12–1.2.15 Клас Square ===");

class Square {
    constructor(a) {
        this.a = a;
    }

    static help() {
        console.log("Square (Квадрат) — правильний чотирикутник, у якого всі сторони рівні та всі кути прямі (90°).");
        console.log("Площа = a², периметр = 4a.");
    }

    length() {
        var perimeter = 4 * this.a;
        console.log("Периметр (сума довжин сторін): " + perimeter);
        return perimeter;
    }

    square() {
        var area = this.a * this.a;
        console.log("Площа: " + area);
        return area;
    }

    info() {
        console.log("--- Інформація про квадрат ---");
        console.log("Сторона a = " + this.a);
        console.log("Сторони: " + this.a + ", " + this.a + ", " + this.a + ", " + this.a);
        console.log("Кути: 90°, 90°, 90°, 90°");
        this.length();
        this.square();
    }
}

// --- 1.2.16–1.2.17 Клас Rectangle extends Square ---
console.log("\n=== 1.2.16–1.2.17 Клас Rectangle ===");

class Rectangle extends Square {
    constructor(a, b) {
        super(a);
        this.b = b;
    }

    static help() {
        console.log("Rectangle (Прямокутник) — чотирикутник, у якого всі кути прямі (90°).");
        console.log("Має дві пари рівних сторін. Площа = a × b, периметр = 2(a + b).");
    }

    length() {
        var perimeter = 2 * (this.a + this.b);
        console.log("Периметр (сума довжин сторін): " + perimeter);
        return perimeter;
    }

    square() {
        var area = this.a * this.b;
        console.log("Площа: " + area);
        return area;
    }

    info() {
        console.log("--- Інформація про прямокутник ---");
        console.log("Сторона a = " + this.a + ", сторона b = " + this.b);
        console.log("Сторони: " + this.a + ", " + this.b + ", " + this.a + ", " + this.b);
        console.log("Кути: 90°, 90°, 90°, 90°");
        this.length();
        this.square();
    }
}

// --- 1.2.18–1.2.19 Клас Rhombus extends Square ---
console.log("\n=== 1.2.18–1.2.19 Клас Rhombus ===");

class Rhombus extends Square {
    constructor(a, alpha, beta) {
        super(a);
        this.alpha = alpha;
        this.beta = beta;
    }

    static help() {
        console.log("Rhombus (Ромб) — чотирикутник, у якого всі сторони рівні.");
        console.log("Протилежні кути рівні. Площа = a² × sin(alpha), периметр = 4a.");
    }

    length() {
        var perimeter = 4 * this.a;
        console.log("Периметр (сума довжин сторін): " + perimeter);
        return perimeter;
    }

    square() {
        var area = this.a * this.a * Math.sin(this.beta * Math.PI / 180);
        console.log("Площа: " + area.toFixed(4));
        return area;
    }

    info() {
        console.log("--- Інформація про ромб ---");
        console.log("Сторона a = " + this.a);
        console.log("Сторони: " + this.a + ", " + this.a + ", " + this.a + ", " + this.a);
        console.log("Кути: " + this.alpha + "°, " + this.beta + "°, " + this.alpha + "°, " + this.beta + "°");
        this.length();
        this.square();
    }
}

// --- 1.2.22 Ґеттери та сеттери для Rhombus ---
// (Parallelogram успадковує від Rectangle, тому Rhombus — той клас,
//  для якого потрібні getters/setters)

Object.defineProperties(Rhombus.prototype, {
    sideA: {
        get: function () {
            return this.a;
        },
        set: function (val) {
            this.a = val;
        }
    },
    angleAlpha: {
        get: function () {
            return this.alpha;
        },
        set: function (val) {
            this.alpha = val;
        }
    },
    angleBeta: {
        get: function () {
            return this.beta;
        },
        set: function (val) {
            this.beta = val;
        }
    }
});

// --- 1.2.20–1.2.21 Клас Parallelogram extends Rectangle ---
console.log("\n=== 1.2.20–1.2.21 Клас Parallelogram ===");

class Parallelogram extends Rectangle {
    constructor(a, b, alpha, beta) {
        super(a, b);
        this.alpha = alpha;
        this.beta = beta;
    }

    static help() {
        console.log("Parallelogram (Паралелограм) — чотирикутник, у якого протилежні сторони попарно паралельні та рівні.");
        console.log("Площа = a × b × sin(beta), периметр = 2(a + b).");
    }

    length() {
        var perimeter = 2 * (this.a + this.b);
        console.log("Периметр (сума довжин сторін): " + perimeter);
        return perimeter;
    }

    square() {
        var area = this.a * this.b * Math.sin(this.beta * Math.PI / 180);
        console.log("Площа: " + area.toFixed(4));
        return area;
    }

    info() {
        console.log("--- Інформація про паралелограм ---");
        console.log("Сторона a = " + this.a + ", сторона b = " + this.b);
        console.log("Сторони: " + this.a + ", " + this.b + ", " + this.a + ", " + this.b);
        console.log("Кути: " + this.alpha + "°, " + this.beta + "°, " + this.alpha + "°, " + this.beta + "°");
        this.length();
        this.square();
    }
}

// --- 1.2.23 Виклик статичного методу help ---
console.log("\n=== 1.2.23 Виклик help() для всіх класів ===");

console.log(">> Square.help():");
Square.help();
console.log("\n>> Rectangle.help():");
Rectangle.help();
console.log("\n>> Rhombus.help():");
Rhombus.help();
console.log("\n>> Parallelogram.help():");
Parallelogram.help();

// --- 1.2.24 Створення об'єктів + info ---
console.log("\n=== 1.2.24 Об'єкти та виклик info() ===");

var sq = new Square(5);
sq.info();

console.log("");
var rect = new Rectangle(6, 4);
rect.info();

console.log("");
var rhomb = new Rhombus(5, 120, 60);
rhomb.info();

// Демонстрація getters/setters для Rhombus (1.2.22)
console.log("\n=== 1.2.22 Демонстрація getters/setters для Rhombus ===");
console.log("Поточна сторона (getter sideA): " + rhomb.sideA);
rhomb.sideA = 7;
console.log("Нова сторона після setter sideA = 7: " + rhomb.sideA);
console.log("Поточний кут alpha (getter angleAlpha): " + rhomb.angleAlpha);
rhomb.angleAlpha = 130;
rhomb.angleBeta = 50;
console.log("Нові кути після setters: alpha = " + rhomb.angleAlpha + "°, beta = " + rhomb.angleBeta + "°");
rhomb.info();

console.log("");
var parallelogram = new Parallelogram(8, 5, 120, 60);
parallelogram.info();


// ============================================================
// ЧАСТИНА 3: Фабрична функція та функції вищого порядку
//            (завдання 1.2.25–1.2.31)
// ============================================================

// --- 1.2.25 Функція Triangular ---
console.log("\n=== 1.2.25 Функція Triangular ===");

function Triangular(a = 3, b = 4, c = 5) {
    return { a, b, c };
}

// --- 1.2.26 Створення 3 об'єктів з Triangular ---
console.log("\n=== 1.2.26 Три об'єкти Triangular ===");

var { a: t1a, b: t1b, c: t1c } = Triangular();
console.log("Трикутник 1 (за замовчуванням): a=" + t1a + ", b=" + t1b + ", c=" + t1c);

var { a: t2a, b: t2b, c: t2c } = Triangular(5, 12, 13);
console.log("Трикутник 2: a=" + t2a + ", b=" + t2b + ", c=" + t2c);

var { a: t3a, b: t3b, c: t3c } = Triangular(7, 8, 10);
console.log("Трикутник 3: a=" + t3a + ", b=" + t3b + ", c=" + t3c);

// --- 1.2.27 Функція PiMultiplier ---
console.log("\n=== 1.2.27 Функція PiMultiplier ===");

function PiMultiplier(n) {
    return function () {
        return Math.PI * n;
    };
}

// --- 1.2.28 Три функції на основі PiMultiplier ---
console.log("\n=== 1.2.28 Демонстрація PiMultiplier ===");

var piTimes2 = PiMultiplier(2);
var piTimes3over2 = PiMultiplier(3 / 2);
var piDivBy2 = PiMultiplier(1 / 2);

console.log("π × 2 = " + piTimes2());
console.log("π × 3/2 = " + piTimes3over2());
console.log("π / 2 = " + piDivBy2());

// --- 1.2.29 Функція Painter ---
console.log("\n=== 1.2.29 Функція Painter ===");

function Painter(color) {
    return function (obj) {
        if (obj.type !== undefined) {
            console.log(color + " " + obj.type);
        } else {
            console.log("No 'type' property occurred!");
        }
    };
}

// --- 1.2.30 PaintBlue, PaintRed, PaintYellow ---
console.log("\n=== 1.2.30 Створення PaintBlue, PaintRed, PaintYellow ===");

var PaintBlue = Painter("Blue");
var PaintRed = Painter("Red");
var PaintYellow = Painter("Yellow");

// --- 1.2.31 Демонстрація на тестових об'єктах ---
console.log("\n=== 1.2.31 Демонстрація Painter ===");

var obj1 = {
    maxSpeed: 280,
    type: "Sportcar",
    color: "magenta"
};

var obj2 = {
    type: "Truck",
    "avg speed": 90,
    "load capacity": 2400
};

var obj3 = {
    maxSpeed: 180,
    color: "purple",
    isCar: true
};

console.log("Об'єкт 1:", obj1);
PaintBlue(obj1);
PaintRed(obj1);
PaintYellow(obj1);

console.log("\nОб'єкт 2:", obj2);
PaintBlue(obj2);
PaintRed(obj2);
PaintYellow(obj2);

console.log("\nОб'єкт 3:", obj3);
PaintBlue(obj3);
PaintRed(obj3);
PaintYellow(obj3);

console.log("\n============================================================");
console.log("  Лабораторна робота №2 — Виконання завершено!");
console.log("============================================================");
