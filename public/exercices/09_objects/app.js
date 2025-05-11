class Vehicle {
    constructor(speed, output) {
        this.speed = speed;
        this.output = output;
    }
    drive() {
        this.output.innerHTML += `Driving at ${this.speed} km/h<br>`;
    }
}
class Car extends Vehicle {
    honk() {
        this.output.innerHTML += `Beep beep!<br>`;
    }
}
class Bicycle extends Vehicle {
    honk() {
        this.output.innerHTML += `Ring Ring<br>`;
    }
}
export function runVehicleExercise(outputId) {
    const el = document.getElementById(outputId);
    if (!el)
        return;
    el.innerHTML = ""; // Clear before displaying
    const vehicles = [
        new Car(120, el),
        new Car(150, el),
        new Bicycle(20, el),
        new Bicycle(25, el),
        new Bicycle(30, el)
    ];
    for (const vehicle of vehicles) {
        vehicle.drive();
        vehicle.honk();
    }
}
