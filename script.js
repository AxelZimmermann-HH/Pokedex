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

const BASE_URL = "https://pokeapi.co/api/v2/";

let pokemons = [];
let offset = 0;


function showLoading() {
  document.getElementById("loading").classList.remove("d-none");
}

function hideLoading() {
  document.getElementById("loading").classList.add("d-none");
}


async function init() {
  await fetchPokemons();
  await showPokemonCards(pokemons);
}


async function fetchPokemons(offset) {
  showLoading();
  let response = await fetch(BASE_URL + `pokemon?offset=${offset}&limit=50`);
  let responseAsJson = await response.json();
  pokemons = responseAsJson;
  hideLoading();
}


async function loadMorePokemons() {
  offset += 50;
  console.log(offset)
  await fetchPokemons(offset)
  await showPokemonCards(pokemons);
}



async function fetchPokemonDetails(url) {
  let response = await fetch(url);
  let detailedInfo = await response.json();
  return detailedInfo;
}


async function fetchPokemon(name) {
  let response = await fetch(`${BASE_URL}pokemon/${name}`);
  let pokemon = await response.json();
  return pokemon;
}


async function fetchEvoSpecies(id) {
  let response = await fetch(`${BASE_URL}pokemon-species/${id}`);
  let species = await response.json();
  return species;
}


async function fetchEvolutionChain(url) {
  let response = await fetch(url);
  let evolutionChain = await response.json();
  return evolutionChain;
}




async function showPokemonCards(data) {
  let content = document.getElementById("all-pokemons");
  let results = data.results;
  showLoading();
  for (let i = 0; i < results.length; i++) {
    let pokemon = results[i];
    let detailedInfo = await fetchPokemonDetails(pokemon.url);
    
    
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
  hideLoading();
}

function showPokemonLayer(i,name,number,imageUrl,imageUrl2,height,weight,
  baseExperience,abilities,bgColor,stat1,stat2,stat3,stat4,stat5,stat6,pokemonId) {
  
  let abilitiesArray = abilities.split(", ");
  let abilitiesHTML = abilitiesArray.join(", ");

  let content = document.getElementById("layer-pokemon");
  content.classList.remove("d-none");
  content.innerHTML = "";
  content.innerHTML += createLayerHTML(name,number,imageUrl,imageUrl2,height,
  weight,baseExperience,abilitiesHTML,bgColor,stat1,stat2,stat3,stat4,stat5,
  stat6,pokemonId);
  
  showMainInfos(height, weight, baseExperience, abilities);
}

function nextPokemon() {
  showPokemonLayer(i,name,number,imageUrl,imageUrl2,height,weight,
    baseExperience,abilities,bgColor,stat1,stat2,stat3,stat4,stat5,stat6,pokemonId)
}

function showMainInfos(height, weight, baseExperience, abilities) {
  let content = document.getElementById("info-content");

  document.getElementById("button1").classList.add("active");
  document.getElementById("button2").classList.remove("active");
  document.getElementById("button3").classList.remove("active");

  content.innerHTML = "";
  content.innerHTML += createMainInfos(
    height,
    weight,
    baseExperience,
    abilities
  );
}

function showStats(bgColor, stat1, stat2, stat3, stat4, stat5, stat6) {
  let content = document.getElementById("info-content");

  document.getElementById("button1").classList.remove("active");
  document.getElementById("button2").classList.add("active");
  document.getElementById("button3").classList.remove("active");

  content.innerHTML = "";
  content.innerHTML += createStats(
    bgColor,
    stat1,
    stat2,
    stat3,
    stat4,
    stat5,
    stat6
  );
}



// Funktion zum Abrufen und Anzeigen der Evolutionsbilder
async function showEvolutionImages(pokemonId) {
  showLoading();
  // Abrufen der Spezies-Informationen für das Pokémon mit der gegebenen ID
  let species = await fetchEvoSpecies(pokemonId);
  let evolutionChainUrl = species.evolution_chain.url;

  // Abrufen der Evolutionskette von der extrahierten URL
  let evolutionChain = await fetchEvolutionChain(evolutionChainUrl);

  // Hier die ersten drei Pokémon der Evolutionskette holen
  let evolutionData = evolutionChain.chain;
  let evoPromises = [];

  // Schleife durch die Evolutionskette, maximal drei Pokémon
  while (evolutionData && evoPromises.length < 3) {
    evoPromises.push(fetchPokemon(evolutionData.species.name));
    evolutionData = evolutionData.evolves_to[0]; // Nächstes Pokémon in der Kette
  }

  // Warten auf alle fetchPokemon-Aufrufe
  let evoResults = await Promise.all(evoPromises);

  // Extrahieren der URLs der Pokémon-Bilder
  let evoImages = evoResults.map(pokemon => pokemon.sprites.other.home.front_default);
  let evoNames = evoResults.map(pokemon => pokemon.name);

  // Bilder in das HTML einfügen
  showEvolution(evoImages, evoNames);
  hideLoading();
}


function showEvolution(imageUrls, names) {
  let content = document.getElementById("info-content");

  document.getElementById("button1").classList.remove("active");
  document.getElementById("button2").classList.remove("active");
  document.getElementById("button3").classList.add("active");

  content.innerHTML = "";
  content.innerHTML = createEvolution(imageUrls, names);
}





function closePokemonLayer() {
  let content = document.getElementById("layer-pokemon");
  content.classList.add("d-none");
  content.innerHTML = "";
}


function getTypeBackground(detailedInfo) {
  return;
  let primaryType = detailedInfo.types[0].type.name;
  let bgColor = typeColors[primaryType] || "#A8A878";
}

// Funktion zum dynamischen Hinzufügen von CSS-Regeln
function addDynamicPseudoClassStyle(selector, style) {
  const styleTag = document.createElement("style");
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

  let b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}
