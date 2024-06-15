const typeColors = {fire: "#F08030", water: "#6890F0", grass: "#78C850", electric: "#F8D030",
  ice: "#98D8D8", fighting: "#C03028", poison: "#A040A0", ground: "#E0C068",
  flying: "#A890F0", psychic: "#F85888", bug: "#A8B820", rock: "#B8A038",
  ghost: "#705898", dark: "#705848", dragon: "#7038F8", steel: "#B8B8D0",
  fairy: "#EE99AC", normal: "#A8A878",
};

const BASE_URL = "https://pokeapi.co/api/v2/";

let nextPokemons = [];
let currentPokemonInfos = [];
let offset = 0;
let currentIndex = 0;
let allPokemonInfos = [];
let dataLoaded = false;




async function init() {
  offset = 0;
  await fetchNextPokemons();
  let content = document.getElementById("all-pokemons");
  content.innerHTML='';
  await showPokemonCards(nextPokemons);
}



async function showPokemonCards(nextPokemons) {
  let content = document.getElementById("all-pokemons");
  let results = nextPokemons.results;
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
    let abilities = detailedInfo.abilities.map(a => a.ability.name).join(', ');
    
    pushCurrentPokemonData(pokemon, detailedInfo, abilities, bgColor);
    content.innerHTML += createCardHTML(i, pokemon, bgColor, detailedInfo, typesHTML);
  }
  buttonLoadMore();
  hideLoading();
  document.getElementById('layer-pokemon').classList.add('d-none');
}




function showPokemonLayer(i,name,number,imageUrl,imageUrl2,height,weight,
  baseExperience,abilities,bgColor,stat1,stat2,stat3,stat4,stat5,stat6,pokemonId, fromSearch = false) {
  
  currentIndex = number - 1; 

  let abilitiesArray = abilities.split(", ");
  let abilitiesHTML = abilitiesArray.join(", ");
  let content = document.getElementById("layer-pokemon");
  
  content.classList.remove("d-none");
  content.innerHTML = "";
  content.innerHTML += createLayerHTML(name,number,imageUrl,imageUrl2,height,
  weight,baseExperience,abilitiesHTML,bgColor,stat1,stat2,stat3,stat4,stat5,
  stat6,pokemonId);
  
  showMainInfos(height, weight, baseExperience, abilities);
  hideArrows();
  
  if (fromSearch) {
    document.getElementById('previous').classList.add('d-none');
    document.getElementById('next').classList.add('d-none');
  }
}



function showMainInfos(height, weight, baseExperience, abilities) {
  let content = document.getElementById("info-content");

  document.getElementById("button1").classList.add("active");
  document.getElementById("button2").classList.remove("active");
  document.getElementById("button3").classList.remove("active");

  content.innerHTML = "";
  content.innerHTML += createMainInfos(height, weight, baseExperience, abilities);
}



function showStats(bgColor, stat1, stat2, stat3, stat4, stat5, stat6) {
  let content = document.getElementById("info-content");

  document.getElementById("button1").classList.remove("active");
  document.getElementById("button2").classList.add("active");
  document.getElementById("button3").classList.remove("active");

  content.innerHTML = "";
  content.innerHTML += createStats(bgColor, stat1, stat2, stat3, stat4, stat5, stat6);
}



async function showEvolutionImages(pokemonId) {
  showLoading();
  
  let species = await fetchEvoSpecies(pokemonId);
  let evolutionChainUrl = species.evolution_chain.url;

  let evolutionChain = await fetchEvolutionChain(evolutionChainUrl);
  let evolutionData = evolutionChain.chain;

  let evoPromises = [];

  while (evolutionData && evoPromises.length < 3) {
    evoPromises.push(fetchPokemon(evolutionData.species.name));
    evolutionData = evolutionData.evolves_to[0];
  }

  let evoResults = await Promise.all(evoPromises);

  let evoImages = evoResults.map(pokemon => pokemon.sprites.other.home.front_default);
  let evoNames = evoResults.map(pokemon => pokemon.name);

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



function nextPokemon() {
  if (currentIndex < currentPokemonInfos.length -1) {
    currentIndex++;
    let nextPokemon = currentPokemonInfos[currentIndex];
    showPokemonLayer(currentIndex, nextPokemon.name, nextPokemon.number, nextPokemon.imageUrl, nextPokemon.imageUrl2, nextPokemon.height, nextPokemon.weight, nextPokemon.baseExperience, nextPokemon.abilities, nextPokemon.bgColor, nextPokemon.stat1, nextPokemon.stat2, nextPokemon.stat3, nextPokemon.stat4, nextPokemon.stat5, nextPokemon.stat6, nextPokemon.pokemonId);
    
    if (currentIndex === currentPokemonInfos.length - 1) {
      document.getElementById('next').classList.add('d-none');
    } 
  }
}



function previousPokemon() {
  if (currentIndex > 0) {
    currentIndex--;
    let prevPokemon = currentPokemonInfos[currentIndex];
    showPokemonLayer(currentIndex, prevPokemon.name, prevPokemon.number, prevPokemon.imageUrl, prevPokemon.imageUrl2, prevPokemon.height, prevPokemon.weight, prevPokemon.baseExperience, prevPokemon.abilities, prevPokemon.bgColor, prevPokemon.stat1, prevPokemon.stat2, prevPokemon.stat3, prevPokemon.stat4, prevPokemon.stat5, prevPokemon.stat6, prevPokemon.pokemonId);

    if (currentIndex === 0) {
      document.getElementById('previous').classList.add('d-none');
    }
  }
}



async function loadMorePokemons() {
  offset += 50;
  await fetchNextPokemons(offset)
  await showPokemonCards(nextPokemons);
}



function checkSearch(event) {
  if (event.key === 'Enter') {
    filterPokemons();
  }
}



async function filterPokemons() {
  let search = document.getElementById('search').value;
  
  if (search.length < 3) {
    showSearchError();
    return; // Beenden der Funktion, wenn die Eingabe weniger als 3 Zeichen hat
  }
  search = search.toLowerCase();

  if (!dataLoaded) {
    await fetchAllPokemonInfos();
  }
  let filteredPokemons = allPokemonInfos.filter(pokemon => pokemon.name.toLowerCase().includes(search));
  renderFilteredPokemons(filteredPokemons);
  document.getElementById('search').value = '';
}



function renderFilteredPokemons(filteredPokemons) {
  let content = document.getElementById('all-pokemons');
  content.innerHTML = ``;

  for (let i = 0; i < filteredPokemons.length; i++) {
    let pokemon = filteredPokemons[i];
    let typesHTML = "";
    for (let j = 0; j < pokemon.types.length; j++) {
      typesHTML = createTypeIcons(typesHTML, pokemon, j);
    }

    content.innerHTML += createCardHTML(i, pokemon, pokemon.bgColor,
      {
        abilities: pokemon.abilities.split(', ').map(ability => ({ ability: { name: ability } })),
        id: pokemon.number, sprites: { other: { home: { front_default: pokemon.imageUrl } } },
        height: pokemon.height, weight: pokemon.weight, base_experience: pokemon.baseExperience,
        stats: [{ base_stat: pokemon.stat1 },{ base_stat: pokemon.stat2 },{ base_stat: pokemon.stat3 },
                { base_stat: pokemon.stat4 },{ base_stat: pokemon.stat5 },{ base_stat: pokemon.stat6 },],
        types: pokemon.types, 
      },
      typesHTML,
      true
    );
  }

  buttonAllPokemon()
}


