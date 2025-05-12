function logToOutput(outputId: string, msg: string) {
    const el = document.getElementById(outputId);
    if (el) el.innerHTML += `<div>${msg}</div>`;
  }
  
  // Question 1
  function calculateSumAsync(a: number, b: number): Promise<number> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(a + b);
      }, 3000);
    });
  }
  
  export async function runQ1(outputId: string) {
    logToOutput(outputId, "=== Test Question 1 ===");
    logToOutput(outputId, "Calcul en cours...");
    const sum = await calculateSumAsync(5, 7);
    logToOutput(outputId, `Résultat: ${sum}`);
  }
  
  // Question 2
  function verifyUser(username: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const validUsername = "admin";
      const validPassword = "1234";
      if (username === validUsername && password === validPassword) {
        resolve();
      } else {
        reject("Nom d'utilisateur ou mot de passe incorrect");
      }
    });
  }
  
  export function runQ2(outputId: string) {
    logToOutput(outputId, "=== Test Question 2 ===");
    verifyUser("admin", "1234")
      .then(() => logToOutput(outputId, "Bienvenue, admin!"))
      .catch(err => logToOutput(outputId, `Erreur: ${err}`));
  
    verifyUser("user", "psjciwqw")
      .then(() => logToOutput(outputId, "Bienvenue!"))
      .catch(err => logToOutput(outputId, `Erreur: ${err}`));
  }
  
  // Question 3
  class Calculator {
    async calculateSumAsync(a: number, b: number): Promise<number> {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(a + b);
        }, 3000);
      });
    }
  
    async printSum(a: number, b: number, outputId: string): Promise<void> {
      logToOutput(outputId, "Calcul en cours...");
      const sum = await this.calculateSumAsync(a, b);
      logToOutput(outputId, `Résultat: ${sum}`);
    }
  }
  
  class Users {
    private validUsername = "admin";
    private validPassword = "1234";
  
    verifyUser(username: string, password: string): Promise<void> {
      return new Promise((resolve, reject) => {
        if (username === this.validUsername && password === this.validPassword) {
          resolve();
        } else {
          reject("Nom d'utilisateur ou mot de passe incorrect");
        }
      });
    }
  
    login(username: string, password: string, outputId: string): void {
      this.verifyUser(username, password)
        .then(() => logToOutput(outputId, `Bienvenue, ${username}!`))
        .catch(err => logToOutput(outputId, `Erreur: ${err}`));
    }
  }
  
  export function runQ3(outputId: string) {
    const calc = new Calculator();
    const users = new Users();
  
    logToOutput(outputId, "=== Test Question 3 - Q1 ===");
    calc.printSum(10, 15, outputId);
  
    logToOutput(outputId, "=== Test Question 3 - Q2 ===");
    users.login("admin", "1234", outputId);
    users.login("guest", "030dwqxsa", outputId);
  }
  