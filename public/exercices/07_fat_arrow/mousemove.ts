let mouseX: number = 0;
let mouseY: number = 0;

// Écouter l'événement "mousemove" pour mettre à jour les coordonnées
document.addEventListener("mousemove", (event: MouseEvent) => {
    mouseX = event.clientX; // Coordonnée X de la souris
    mouseY = event.clientY; // Coordonnée Y de la souris
});

// Utiliser setInterval pour afficher les coordonnées toutes les secondes
setInterval(() => {
    console.log(`Coordonnées de la souris : x = ${mouseX}, y = ${mouseY}`);
}, 1000); 