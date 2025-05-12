// Hypothèse : Un employé a droit à 30 jours de vacances par an.

export function calculerJoursRestants(): number {
    const joursPris = 10; // par exemple, un employee a pris 10 jours de vacances
    return 30 - joursPris; // on suppose que un employee a 30 jours de vacances par an
}