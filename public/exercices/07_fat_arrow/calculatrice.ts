// Fonctions fléchées avec expressions pour les opérations de base
const additionner = (a: number, b: number): number => a + b;
const soustraire = (a: number, b: number): number => a - b;
const multiplier = (a: number, b: number): number => a * b;
const diviser = (a: number, b: number): number => a / b;

// Fonction calculatrice avec une instruction pour déterminer l'opération
const calculatrice = (a: number, b: number, operation: string): void => {
    let resultat: number;

    switch (operation) {
        case "additionner":
            resultat = additionner(a, b);
            console.log(`La somme est: ${resultat}`);
            break;
        case "soustraire":
            resultat = soustraire(a, b);
            console.log(`La différence est: ${resultat}`);
            break;
        case "multiplier":
            resultat = multiplier(a, b);
            console.log(`Le produit est: ${resultat}`);
            break;
        case "diviser":
            resultat = diviser(a, b);
            console.log(`Le quotient est: ${resultat}`);
            break;
        default:
            console.log("Opération non reconnue.");
            break;
    }
};

// Exemples d'utilisation
calculatrice(5, 3, "additionner"); // Affiche "La somme est: 8"
calculatrice(5, 3, "soustraire");  // Affiche "La différence est: 2"
calculatrice(5, 3, "multiplier");  // Affiche "Le produit est: 15"
calculatrice(5, 3, "diviser");     // Affiche "Le quotient est: 1.6666666666666667"