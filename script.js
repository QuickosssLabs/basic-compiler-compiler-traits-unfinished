const canvas = document.getElementById('characterCanvas');
const ctx = canvas.getContext('2d');

// Variables pour stocker les sélections
let selectedtype;
let selectedType;
let selectedGlasses;
let selectedHair;

// Fonction pour dessiner le personnage
function drawCharacter() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const typeImg = new Image();
    typeImg.src = `images/type/${selectedtype}.png`;
    typeImg.onload = () => {
        const typeX = (canvas.width - typeImg.width) / 2; // Centrer le type
        const typeY = (canvas.height - typeImg.height) / 2; // Centrer le type
        ctx.drawImage(typeImg, typeX, typeY); // Dessiner l'arrière-plan centré
        drawLayers();
    };
}

function drawLayers() {
    const typeImg = new Image();
    typeImg.src = `images/type/${selectedType}.png`;
    typeImg.onload = () => {
        const typeX = (canvas.width - typeImg.width) / 2;
        const typeY = (canvas.height - typeImg.height) / 2;
        ctx.drawImage(typeImg, typeX, typeY); // Dessiner le type au centre
        drawGlasses();
    };
}

function drawGlasses() {
    const glassesImg = new Image();
    glassesImg.src = `images/glasses/${selectedGlasses}.png`;
    glassesImg.onload = () => {
        const glassesX = (canvas.width - glassesImg.width) / 2;
        const glassesY = (canvas.height - glassesImg.height) / 2;
        ctx.drawImage(glassesImg, glassesX, glassesY); // Dessiner les lunettes au centre
        drawHair();
    };
}

function drawHair() {
    const hairImg = new Image();
    hairImg.src = `images/hair/${selectedHair}.png`;
    hairImg.onload = () => {
        const hairX = (canvas.width - hairImg.width) / 2;
        const hairY = (canvas.height - hairImg.height) / 2;
        ctx.drawImage(hairImg, hairX, hairY); // Dessiner les cheveux au centre
    };
}

// Fonction pour mettre à jour la sélection
function updateSelection(layer, value) {
    if (layer === 'type') selectedtype = value;
    else if (layer === 'type') selectedType = value;
    else if (layer === 'glasses') selectedGlasses = value;
    else if (layer === 'hair') selectedHair = value;

    drawCharacter();  // Redessine le canvas
}

// Fonction pour sélectionner aléatoirement une couche
function randomizeSelections() {
    const type = ['male', 'female', 'ape', 'zombie', 'alien'];
    const types = ['type1', 'type2', 'type3'];
    const glasses = ['glasses1', 'glasses2', 'glasses3'];
    const hairs = ['hair1', 'hair2', 'hair3'];

    selectedtype = type[Math.floor(Math.random() * type.length)];
    selectedType = types[Math.floor(Math.random() * types.length)];
    selectedGlasses = glasses[Math.floor(Math.random() * glasses.length)];
    selectedHair = hairs[Math.floor(Math.random() * hairs.length)];

    drawCharacter(); // Redessine le canvas avec les sélections aléatoires
}

// Ajout d'événements sur les menus
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
        const layer = item.parentElement.id.replace('Menu', '');  // Exemple: "typeMenu" devient "type"
        const value = item.getAttribute('data-value');
        updateSelection(layer, value);  // Met à jour la sélection et redessine
    });
});

// Exécuter une sélection initiale et dessiner le personnage au chargement
window.onload = () => {
    randomizeSelections(); // Appel pour sélectionner aléatoirement au chargement
};

// Écouteur d'événements pour le bouton de téléchargement
document.getElementById('downloadBtn').addEventListener('click', downloadImage);

// Ajout d'un événement pour le bouton "randomize"
document.getElementById('randomizeBtn').addEventListener('click', randomizeSelections);

// Fonction pour télécharger l'image du canvas
function downloadImage() {
    const link = document.createElement('a');
    link.download = 'character.png'; // Nom du fichier téléchargé
    link.href = canvas.toDataURL('image/png'); // Convertir le canvas en image
    link.click(); // Simuler le clic pour télécharger
}
