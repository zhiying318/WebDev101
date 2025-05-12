var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function logToOutput(outputId, msg) {
    const el = document.getElementById(outputId);
    if (el)
        el.innerHTML += `<div>${msg}</div>`;
}
// Question 1
function calculateSumAsync(a, b) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(a + b);
        }, 3000);
    });
}
export function runQ1(outputId) {
    return __awaiter(this, void 0, void 0, function* () {
        logToOutput(outputId, "=== Test Question 1 ===");
        logToOutput(outputId, "Calcul en cours...");
        const sum = yield calculateSumAsync(5, 7);
        logToOutput(outputId, `Résultat: ${sum}`);
    });
}
// Question 2
function verifyUser(username, password) {
    return new Promise((resolve, reject) => {
        const validUsername = "admin";
        const validPassword = "1234";
        if (username === validUsername && password === validPassword) {
            resolve();
        }
        else {
            reject("Nom d'utilisateur ou mot de passe incorrect");
        }
    });
}
export function runQ2(outputId) {
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
    calculateSumAsync(a, b) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(a + b);
                }, 3000);
            });
        });
    }
    printSum(a, b, outputId) {
        return __awaiter(this, void 0, void 0, function* () {
            logToOutput(outputId, "Calcul en cours...");
            const sum = yield this.calculateSumAsync(a, b);
            logToOutput(outputId, `Résultat: ${sum}`);
        });
    }
}
class Users {
    constructor() {
        this.validUsername = "admin";
        this.validPassword = "1234";
    }
    verifyUser(username, password) {
        return new Promise((resolve, reject) => {
            if (username === this.validUsername && password === this.validPassword) {
                resolve();
            }
            else {
                reject("Nom d'utilisateur ou mot de passe incorrect");
            }
        });
    }
    login(username, password, outputId) {
        this.verifyUser(username, password)
            .then(() => logToOutput(outputId, `Bienvenue, ${username}!`))
            .catch(err => logToOutput(outputId, `Erreur: ${err}`));
    }
}
export function runQ3(outputId) {
    const calc = new Calculator();
    const users = new Users();
    logToOutput(outputId, "=== Test Question 3 - Q1 ===");
    calc.printSum(10, 15, outputId);
    logToOutput(outputId, "=== Test Question 3 - Q2 ===");
    users.login("admin", "1234", outputId);
    users.login("guest", "030dwqxsa", outputId);
}
