var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var currentNummber = 0;
var currentColor = "red";
var hasPlayed = false;
var gameFinished = false;
//Ajoute un titre h1 avec le texte "Puissance 4" centré sur la page
var title = document.createElement("h1");
title.innerHTML = "Punto";
title.style.textAlign = "center";
document.body.appendChild(title);
var player = document.createElement("h2");
player.innerHTML = "Joueur : Rouge";
player.style.textAlign = "center";
// mettre le texte en rouge
player.style.color = "red";
document.body.appendChild(player);
var numero = document.createElement("h2");
numero.innerHTML = "Nombre : 0";
numero.style.textAlign = "center";
document.body.appendChild(numero);
// fond gris foncé pour le body
document.body.style.backgroundColor = "darkgrey";
//affiche une grille 11x11 avec <table> et <tr> et <td>, chaque case est de forme carré avec une bordure noire
//fond legerement gris pour les cases autour de la case centrale qui elle reste blanche
var table = document.createElement("table");
//boucle for pour les lignes
for (var i = 0; i < 11; i++) {
    var row = document.createElement("tr");
    //boucle for pour les colonnes
    for (var j = 0; j < 11; j++) {
        var cell = document.createElement("td");
        cell.style.width = "50px";
        cell.style.height = "50px";
        cell.style.border = "1px solid black";
        cell.style.backgroundColor = "lightgrey";
        // centré le texte dans la case
        cell.style.textAlign = "center";
        if (i === 5 && j === 5) {
            cell.style.backgroundColor = "white";
        }
        row.appendChild(cell);
    }
    table.appendChild(row);
}
document.body.appendChild(table);
// Centrer le tableau sur l'écran
table.style.margin = "auto";
function setValue(i, j, value) {
    var cell = table.rows[i].cells[j];
    cell.innerHTML = value.toString();
}
function getValue(i, j) {
    var cell = table.rows[i].cells[j];
    return parseInt(cell.innerHTML);
}
function setColor(i, j, color) {
    var cell = table.rows[i].cells[j];
    cell.style.backgroundColor = color;
}
function getColor(i, j) {
    var cell = table.rows[i].cells[j];
    return cell.style.backgroundColor;
}
function setListeners() {
    var _loop_1 = function (i) {
        var _loop_2 = function (j) {
            table.rows[i].cells[j].addEventListener("click", function () {
                if (!gameFinished) {
                    clickedOnCell(i, j);
                }
            });
        };
        for (var j = 0; j < 11; j++) {
            _loop_2(j);
        }
    };
    //ecouteur d'evenement du click qui gere chaque clic de souris par la fonction clickedOnCell
    for (var i = 0; i < 11; i++) {
        _loop_1(i);
    }
}
function clickedOnCell(i, j) {
    var value = getValue(i, j);
    // console.log("Coordonnées de la case cliquée : (" + i + "," + j + ")");
    if (isCorrectPlacement(i, j, currentNummber) && isWithinLimits(i, j)) {
        setValue(i, j, currentNummber);
        setColor(i, j, currentColor);
        hasPlayed = true;
    }
    else {
        console.log("Placement incorrect");
    }
}
function isEmpty(i, j) {
    return isNaN(getValue(i, j));
}
function testIsEmpty() {
    setValue(5, 5, 42);
    console.log(getValue(5, 5));
    console.log(isEmpty(5, 5));
    console.log(getValue(0, 0));
    console.log(isEmpty(0, 0));
}
function isCorrectAdjacency(i, j) {
    if (i > 0 && i < 10 && j > 0 && j < 10) {
        for (var k = -1; k <= 1; k++) {
            for (var l = -1; l <= 1; l++) {
                if (!isEmpty(i + k, j + l)) {
                    return true;
                }
            }
        }
    }
    //the corners
    if (i === 0 && j === 0) {
        if (!isEmpty(i + 1, j) || !isEmpty(i, j + 1) || !isEmpty(i + 1, j + 1)) {
            return true;
        }
    }
    if (i === 0 && j === 10) {
        if (!isEmpty(i + 1, j) || !isEmpty(i, j - 1) || !isEmpty(i + 1, j - 1)) {
            return true;
        }
    }
    if (i === 10 && j === 0) {
        if (!isEmpty(i - 1, j) || !isEmpty(i, j + 1) || !isEmpty(i - 1, j + 1)) {
            return true;
        }
    }
    if (i === 10 && j === 10) {
        if (!isEmpty(i - 1, j) || !isEmpty(i, j - 1) || !isEmpty(i - 1, j - 1)) {
            return true;
        }
    }
    //the sides
    if (i === 0 && j > 0 && j < 10) {
        for (var k = 0; k <= 1; k++) {
            for (var l = -1; l <= 1; l++) {
                if (!isEmpty(i + k, j + l)) {
                    return true;
                }
            }
        }
    }
    if (i === 10 && j > 0 && j < 10) {
        for (var k = 0; k <= 1; k++) {
            for (var l = -1; l <= 1; l++) {
                if (!isEmpty(i - k, j + l)) {
                    return true;
                }
            }
        }
    }
    if (j === 0 && i > 0 && i < 10) {
        for (var k = -1; k <= 1; k++) {
            for (var l = 0; l <= 1; l++) {
                if (!isEmpty(i + k, j + l)) {
                    return true;
                }
            }
        }
    }
    if (j === 10 && i > 0 && i < 10) {
        for (var k = -1; k <= 1; k++) {
            for (var l = 0; l <= 1; l++) {
                if (!isEmpty(i + k, j - l)) {
                    return true;
                }
            }
        }
    }
    return false;
}
function testAdjacency() {
    // test of adjacency
    setValue(2, 1, 1);
    setValue(3, 1, 2);
    setValue(3, 2, 3);
    for (var i = 0; i < 11; i++) {
        for (var j = 0; j < 11; j++) {
            console.log("Coordonnées de la case : (" + i + "," + j + ")");
            console.log(isCorrectAdjacency(i, j));
        }
    }
    console.log();
}
function isCorrectPlacement(i, j, value) {
    if (isEmpty(i, j)) {
        if (isCorrectAdjacency(i, j)) {
            return true;
        }
        else {
            return false;
        }
    }
    if (value > getValue(i, j)) {
        return true;
    }
    return false;
}
function testIsCorrectPlacement() {
    setValue(2, 1, 1);
    setValue(3, 1, 2);
    setValue(3, 2, 3);
    for (var i = 0; i < 11; i++) {
        for (var j = 0; j < 11; j++) {
            if (isCorrectPlacement(i, j, 4)) {
                console.log("Coordonnées de la case : (" + i + "," + j + ")");
            }
        }
    }
}
//ecrit une liste de nombres de 1 à 9
var redList = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
var greenList = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
var blueList = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
var yellowList = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
function getAndRemoveRandomCard(list) {
    //cherche un nombre entre 0 et la longueur de la liste -1
    var index = Math.floor(Math.random() * list.length);
    //enregistre la valeur de la liste à l'index trouvé
    var value = list[index];
    //supprime la valeur de la liste
    list.splice(index, 1);
    return value;
}
function testGetAndRemoveRandomCard() {
    // for (let i = 0; i<18; i++){
    //     console.log(getAndRemoveRandomCard(redList));
    // }
    for (var i = 0; i < 5; i++) {
        console.log(getAndRemoveRandomCard(redList));
    }
    console.log(redList);
}
// la couleur gagne si elle a 4 cartes d'affillée (horizontalement, verticalement ou diagonalement)
function hasWin(color) {
    for (var i = 0; i < 11; i++) {
        for (var j = 0; j < 11; j++) {
            if (getColor(i, j) === color) {
                //horizontal
                if (j < 8) {
                    if (getColor(i, j + 1) === color && getColor(i, j + 2) === color && getColor(i, j + 3) === color) {
                        return true;
                    }
                }
                //vertical
                if (i < 8) {
                    if (getColor(i + 1, j) === color && getColor(i + 2, j) === color && getColor(i + 3, j) === color) {
                        return true;
                    }
                }
                //diagonal
                if (i < 8 && j < 8) {
                    if (getColor(i + 1, j + 1) === color && getColor(i + 2, j + 2) === color && getColor(i + 3, j + 3) === color) {
                        return true;
                    }
                }
                if (i < 8 && j > 2) {
                    if (getColor(i + 1, j - 1) === color && getColor(i + 2, j - 2) === color && getColor(i + 3, j - 3) === color) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}
function testHasWin() {
    setColor(0, 5, "red");
    setColor(0, 6, "red");
    setColor(0, 7, "red");
    setColor(0, 8, "red");
    console.log(hasWin("red"));
    setColor(5, 5, "green");
    setColor(6, 5, "green");
    setColor(7, 5, "green");
    console.log(hasWin("green"));
    setColor(5, 5, "blue");
    setColor(6, 6, "blue");
    setColor(7, 7, "blue");
    console.log(hasWin("blue"));
    setColor(5, 5, "yellow");
    setColor(6, 4, "yellow");
    setColor(7, 3, "yellow");
    console.log(hasWin("yellow"));
}
function isWithinLimits(k, l) {
    for (var i = 0; i < 11; i++) {
        for (var j = 0; j < 11; j++) {
            if (!isEmpty(i, j)) {
                if (Math.abs(i - k) <= 5 && Math.abs(j - l) <= 5) {
                }
                else {
                    return false;
                }
            }
        }
    }
    return true;
}
function game() {
    return __awaiter(this, void 0, void 0, function () {
        var listColor, listList, firstNumbnber, firstColor, turn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setListeners();
                    listColor = ["red", "green", "blue", "yellow"];
                    listList = [redList, greenList, blueList, yellowList];
                    firstNumbnber = getAndRemoveRandomCard(listList[0]);
                    firstColor = listColor[0];
                    console.log("The first number is " + firstNumbnber);
                    console.log("The first color is " + firstColor);
                    setValue(5, 5, firstNumbnber);
                    setColor(5, 5, firstColor);
                    turn = 1;
                    _a.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 3];
                    if (hasWin("red")) {
                        console.log("Red wins!");
                        gameFinished = true;
                        return [3 /*break*/, 3];
                    }
                    if (hasWin("green")) {
                        console.log("Green wins!");
                        gameFinished = true;
                        return [3 /*break*/, 3];
                    }
                    if (hasWin("blue")) {
                        console.log("Blue wins!");
                        gameFinished = true;
                        return [3 /*break*/, 3];
                    }
                    if (hasWin("yellow")) {
                        console.log("Yellow wins!");
                        gameFinished = true;
                        return [3 /*break*/, 3];
                    }
                    currentNummber = getAndRemoveRandomCard(listList[turn]);
                    currentColor = listColor[turn];
                    player.innerHTML = "Joueur : " + currentColor;
                    numero.innerHTML = "Nombre : " + currentNummber;
                    player.style.color = currentColor;
                    console.log("It's " + currentColor + " turn!");
                    console.log("The number is " + currentNummber);
                    hasPlayed = false;
                    return [4 /*yield*/, waitForPlayerMove()];
                case 2:
                    _a.sent();
                    turn = (turn + 1) % 4;
                    return [3 /*break*/, 1];
                case 3: 
                // sleep 1s
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 4:
                    // sleep 1s
                    _a.sent();
                    finishScreen();
                    return [2 /*return*/];
            }
        });
    });
}
// supprimer tout ce qu'il y a sur l'écran et afficher "Fin de la partie!" centré sur la page
function finishScreen() {
    document.body.innerHTML = "";
    var end = document.createElement("h1");
    end.innerHTML = "Fin de la partie!";
    end.style.textAlign = "center";
    var winner = document.createElement("h2");
    if (hasWin("red")) {
        winner.innerHTML = "Le joueur rouge a gagné!";
        winner.style.color = "red";
    }
    if (hasWin("green")) {
        winner.innerHTML = "Le joueur vert a gagné!";
        winner.style.color = "green";
    }
    if (hasWin("blue")) {
        winner.innerHTML = "Le joueur bleu a gagné!";
        winner.style.color = "blue";
    }
    if (hasWin("yellow")) {
        winner.innerHTML = "Le joueur jaune a gagné!";
        winner.style.color = "yellow";
    }
    winner.style.textAlign = "center";
    document.body.appendChild(end);
    document.body.appendChild(winner);
    var replay = document.createElement("h2");
    replay.innerHTML = "Ctrl + R pour rejouer";
    replay.style.textAlign = "center";
    document.body.appendChild(replay);
}
function waitForPlayerMove() {
    return new Promise(function (resolve) {
        var checkInterval = setInterval(function () {
            if (hasPlayed) {
                clearInterval(checkInterval);
                resolve();
            }
        }, 100); // Vérifie toutes les 100ms si le joueur a joué
    });
}
function main() {
    // setValue(5,5,42);
    // console.log(getValue(5,5));
    // setColor(5,5,"red");
    // console.log(getColor(5,5));
    // setListeners();
    // testIsEmpty();
    // testAdjacency();
    // testIsCorrectPlacement();
    // testGetAndRemoveRandomCard();
    // testHasWin();
    game();
}
main();
