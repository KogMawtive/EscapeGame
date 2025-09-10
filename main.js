const IH = window.innerHeight;
const IW = window.innerWidth;

const wall = document.getElementById("wall");

wall.style.left = (IW / 2) + "px"
wall.style.top = (IH / 2) + "px"

// Fonction drag & drop basique
const objects = document.querySelectorAll('.object');

// Sauvegarde de la position initiale du lit
const bed = document.getElementById("bed");
const bedStart = { left: bed.offsetLeft, top: bed.offsetTop };
let bedMoved = false; // pour savoir si le lit a déjà été déplacé


objects.forEach(obj => {
  obj.addEventListener('mousedown', startDrag);
});

let current = null;
let offsetX, offsetY;

function startDrag(e) {
  current = e.target;
  offsetX = e.clientX - current.offsetLeft;
  offsetY = e.clientY - current.offsetTop;
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', stopDrag);
}

function drag(e) {
  if (!current) return;
  current.style.left = (e.clientX - offsetX) + 'px';
  current.style.top = (e.clientY - offsetY) + 'px';
  // Vérifie si c'est le lit et s'il a été déplacé pour la première fois
  if (current.id === "bed" && !bedMoved) {
    bedMoved = true;
    revealObjectUnderBed();
  }
}


function stopDrag() {
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('mouseup', stopDrag);
  current = null;
}

// Fonction qui fait apparaître un objet caché sous le lit
function revealObjectUnderBed() {
  const hidden = document.createElement("img");
  hidden.src = "binaire.png"; // <-- image de l'objet caché
  hidden.alt = "caché";
  hidden.className = "object"; 
  hidden.style.position = "absolute";
  hidden.style.left = bedStart.left + "px";
  hidden.style.top = bedStart.top + "px";
  hidden.style.width = "80px";
}

function chargerRessource(url) {
  return new Promise((resolve, reject) => {
    const ressource = new Image();

    ressource.onload = () => {
      resolve(ressource); // renvoie l’objet image prêt à être utilisé
    };
    ressource.onerror = () => {
      reject(new Error(`Échec du chargement: ${url}`));
    };

    ressource.src = url;
  });
}

async function demarrerJeu() {
  try {
    // Tableau d'URLs des ressources
    const urls = [
      "lit.png",
      "coffre.png",
      "glaçon.webp",
      "mur.png",
      "soleil.webp"
      "cle.png"
      "binaire.png"
      "coffre_ouvert.png"
    ];

    // Crée un tableau de promesses
    const promesses = urls.map(url => chargerRessource(url));

    // Attends que toutes les promesses soient résolues
    const images = await Promise.all(promesses);

    // Les images sont disponibles dans "images" dans le même ordre que "urls"
    images.forEach(img => {
      document.body.appendChild(img);
    });

    console.log("Toutes les images sont chargées !");
  } catch (err) {
    console.error(err.message);
  }
}




