import { calculerJoursRestants as calculerVacances } from "./moduleVacances.js";
import { calculerJoursRestants as calculerTravail } from "./moduleTravail.js";
export function runCalcul(outputId) {
    const vacancesRestantes = calculerVacances();
    const travailRestant = calculerTravail();
    const resultatVacances = document.createElement("div");
    resultatVacances.textContent = `Jours de vacances restants : ${vacancesRestantes}`;
    const resultatTravail = document.createElement("div");
    resultatTravail.textContent = `Jours de travail restants : ${travailRestant}`;
    const container = document.getElementById(outputId);
    if (container) {
        container.innerHTML = "";
        container.appendChild(resultatVacances);
        container.appendChild(resultatTravail);
    }
}
