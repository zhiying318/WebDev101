class Rectangle {
    constructor(longueur, largeur, output) {
        this.longueur = longueur;
        this.largeur = largeur;
        this.output = output;
    }
    calculerSurface() {
        if (this.longueur <= 0 || this.largeur <= 0) {
            throw new Error(`Les dimensions doivent être positives. Reçues: longueur=${this.longueur}, largeur=${this.largeur}`);
        }
        return this.longueur * this.largeur;
    }
    essayerCalculSurface() {
        try {
            const surface = this.calculerSurface();
            this.output.innerHTML += `<div>Rectangle (${this.longueur}x${this.largeur}) - Surface: ${surface}</div>`;
        }
        catch (e) {
            this.output.innerHTML += `<div style="color: red;">Erreur pour le rectangle (${this.longueur}x${this.largeur}): ${e.message}</div>`;
        }
        finally {
            this.output.innerHTML += `<div>Calcul terminé pour (${this.longueur}x${this.largeur})</div><hr>`;
        }
    }
}
export function runRectangleTest(outputId) {
    const el = document.getElementById(outputId);
    if (!el)
        return;
    el.innerHTML = "<strong>=== Test des rectangles ===</strong><br><br>";
    const rectangles = [
        new Rectangle(5, 10, el),
        new Rectangle(0, 8, el),
        new Rectangle(4, -3, el),
        new Rectangle(7, 12, el)
    ];
    rectangles.forEach(rect => rect.essayerCalculSurface());
}
