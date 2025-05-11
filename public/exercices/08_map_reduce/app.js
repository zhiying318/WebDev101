const fruits = ["pomme", "kiwi", "banane", "cerise", "orange", "poire", "fraise", "prune", "ananas", "pêche"];
const fruitsUpperCase = fruits.map(fruit => fruit.toUpperCase());
console.log(fruitsUpperCase);
const fruitsStartingWithP = fruits.filter(fruit => fruit.startsWith('p'));
console.log(fruitsStartingWithP); // ["pomme", "poire", "prune", "pêche"]
const fruitsJoined = fruits.reduce((acc, fruit) => acc + (acc ? ', ' : '') + fruit, '');
console.log(fruitsJoined);
const firstFruitWithMoreThanFiveLetters = fruits.find(fruit => fruit.length > 5);
console.log(firstFruitWithMoreThanFiveLetters); // "banane"
export { fruitsUpperCase, fruitsStartingWithP, fruitsJoined, firstFruitWithMoreThanFiveLetters };
