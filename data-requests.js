async function fetchNextPokemons(offset) {
  showLoading();
  let response = await fetch(BASE_URL + `pokemon?offset=${offset}&limit=50`);
  let responseAsJson = await response.json();
  nextPokemons = responseAsJson;
  hideLoading();
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



async function fetchAllPokemonInfos() {
  const limit = 100; // Anzahl der Pokémon, die pro API-Aufruf geladen werden
  let offset = 0;
  let url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  showLoading();

  let data = await loadAllSites(url, limit);
  await loadLastSite(data);

  hideLoading();
  dataLoaded = true;
}



async function loadAllSites(url, limit) {
  let offset = 0;
  let response = await fetch(url);
  let data = await response.json();

  while (data.next) {
    let promises = data.results.map(async (pokemon) => {
      let pokemonDetails = await fetchPokemonDetails(pokemon.url);
      allPokemonInfos.push(formatPokemonDetails(pokemon, pokemonDetails));
    });

    await Promise.all(promises);
    offset += limit;
    url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    response = await fetch(url);
    data = await response.json();
  }

  return data;
}



async function loadLastSite(data) {
  let promises = data.results.map(async (pokemon) => {
    let pokemonDetails = await fetchPokemonDetails(pokemon.url);
    allPokemonInfos.push(formatPokemonDetails(pokemon, pokemonDetails));
  });

  await Promise.all(promises);
}
