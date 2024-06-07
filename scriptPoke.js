const typeColors = {
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dark: "#705848",
  dragon: "#7038F8",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
  normal: "#A8A878",
};

const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";

let pokemons = [];
let detailedInfo = [];

async function init() {
  await fetchPokemons();
}

// Holt Basic Infos und rendert
async function fetchPokemons() {
  let response = await fetch(BASE_URL);
  let responseAsJson = await response.json();
  pokemons = responseAsJson; // Speichern der Daten in globaler Variable
  console.log(pokemons);
  showPokemonCards(pokemons); // Funktion zur Erstellung der Tabelle, greift auf JSON zu
  console.log("check");
}

async function fetchDetails(url) {
  let response = await fetch(url);
  let detailedInfo = await response.json();
  console.log(detailedInfo);
  return detailedInfo;
}

async function showPokemonCards(data) {
  let content = document.getElementById("all-pokemons");
  let results = data.results;

  for (let i = 0; i < results.length; i++) {
    let pokemon = results[i];
    let detailedInfo = await fetchDetails(pokemon.url);
    let typesHTML = "";

    for (let j = 0; j < detailedInfo.types.length; j++) {
      typesHTML = createTypeIcons(typesHTML, detailedInfo, j);
    }

    let primaryType = detailedInfo.types[0].type.name;
    let bgColor = typeColors[primaryType] || "#A8A878";

    content.innerHTML += createCardHTML(
      i,
      pokemon,
      bgColor,
      detailedInfo,
      typesHTML
    );
  }
}


function showPokemonLayer(i, name, imageUrl, height, weight, baseExperience, abilities, bgColor) {
  let abilitiesArray = abilities.split(', ');
  let abilitiesHTML = abilitiesArray.join(', ');

  let content = document.getElementById('layer-pokemon');
  content.classList.remove('d-none');
  content.innerHTML = '';
  content.innerHTML += createLayerHTML(name, imageUrl, height, weight, baseExperience, abilitiesHTML, bgColor);
}


function closePokemonLayer() {
  let content = document.getElementById('layer-pokemon');
  content.classList.add('d-none');
  content.innerHTML = '';
}


function getTypeBackground(detailedInfo) {
  return;
  let primaryType = detailedInfo.types[0].type.name;
  let bgColor = typeColors[primaryType] || "#A8A878";
};


  // Funktion zum dynamischen Hinzufügen von CSS-Regeln
  function addDynamicPseudoClassStyle(selector, style) {
    const styleTag = document.createElement('style');
    document.head.appendChild(styleTag);
    const sheet = styleTag.sheet;
    sheet.insertRule(`${selector} { ${style} }`, 0);
  }


  function lightenDarkenColor(col, amt) {
    let usePound = false;
  
    if (col[0] === "#") {
      col = col.slice(1);
      usePound = true;
    }
  
    let num = parseInt(col, 16);
  
    let r = (num >> 16) + amt;
  
    if (r > 255) r = 255;
    else if (r < 0) r = 0;
  
    let b = ((num >> 8) & 0x00FF) + amt;
  
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
  
    let g = (num & 0x0000FF) + amt;
  
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
  
    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
  }
  