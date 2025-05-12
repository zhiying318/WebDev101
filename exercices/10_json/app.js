export function runJsonExercise(outputId) {
    class User {
        constructor(id, name, age, scores) {
            this.id = id;
            this.name = name;
            this.age = age;
            this.scores = scores;
        }
        getMaxScore() {
            return Math.max(...this.scores);
        }
        getAverageScore() {
            if (this.scores.length === 0)
                return 0;
            const sum = this.scores.reduce((a, b) => a + b, 0);
            return sum / this.scores.length;
        }
    }
    const users = [
        new User("1", "Alice", 25, [80, 90, 85]),
        new User("2", "Bob", 30, [70, 75, 80, 65]),
        new User("3", "Charlie", 22, [95, 85, 90]),
    ];
    // Serialize
    const serialized = JSON.stringify(users);
    // Deserialize (plain objects, not class instances)
    const plainObjects = JSON.parse(serialized);
    // Revive
    const revivedUsers = plainObjects.map((data) => new User(data.id, data.name, data.age, data.scores));
    const result = `User: ${revivedUsers[1].name}, Max: ${revivedUsers[1].getMaxScore()}, Avg: ${revivedUsers[1].getAverageScore().toFixed(2)}`;
    const el = document.getElementById(outputId);
    if (el)
        el.textContent = result;
}
