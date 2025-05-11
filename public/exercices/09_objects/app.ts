interface IVehicle {
    drive(): void;
    honk(): void;
  }
  
  abstract class Vehicle implements IVehicle {
    constructor(protected speed: number, protected output: HTMLElement) {}
  
    abstract honk(): void;
  
    drive(): void {
      this.output.innerHTML += `Driving at ${this.speed} km/h<br>`;
    }
  }
  
  class Car extends Vehicle {
    honk(): void {
      this.output.innerHTML += `Beep beep!<br>`;
    }
  }
  
  class Bicycle extends Vehicle {
    honk(): void {
      this.output.innerHTML += `Ring Ring<br>`;
    }
  }
  
  export function runVehicleExercise(outputId: string) {
    const el = document.getElementById(outputId);
    if (!el) return;
  
    el.innerHTML = ""; // Clear before displaying
  
    const vehicles: IVehicle[] = [
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
  