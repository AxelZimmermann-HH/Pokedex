function pushCurrentPokemonData(pokemon, detailedInfo, abilities, bgColor) {
  currentPokemonInfos.push({
    name: pokemon.name,
    number: detailedInfo.id,
    imageUrl: detailedInfo.sprites.other.home.front_default,
    imageUrl2: detailedInfo.sprites.other.home.front_default,
    height: detailedInfo.height,
    weight: detailedInfo.weight,
    baseExperience: detailedInfo.base_experience,
    abilities: abilities,
    bgColor: bgColor,
    stat1: detailedInfo.stats[0].base_stat,
    stat2: detailedInfo.stats[1].base_stat,
    stat3: detailedInfo.stats[2].base_stat,
    stat4: detailedInfo.stats[3].base_stat,
    stat5: detailedInfo.stats[4].base_stat,
    stat6: detailedInfo.stats[5].base_stat,
    types: detailedInfo.types,
    pokemonId: detailedInfo.id,
  });
}



function showLoading() {
  document.getElementById("loading").classList.remove("d-none");
}



function hideLoading() {
  document.getElementById("loading").classList.add("d-none");
}



function hideArrows() {
  if (currentIndex === currentPokemonInfos.length - 1) {
    document.getElementById("next").classList.add("d-none");
  }
  if (currentIndex === 0) {
    document.getElementById("previous").classList.add("d-none");
  }
}



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



function formatPokemonDetails(pokemon, pokemonDetails) {
    return {
      name: pokemon.name,
      number: pokemonDetails.id,
      imageUrl: pokemonDetails.sprites.other.home.front_default,
      imageUrl2: pokemonDetails.sprites.other.home.front_default,
      height: pokemonDetails.height,
      weight: pokemonDetails.weight,
      baseExperience: pokemonDetails.base_experience,
      abilities: pokemonDetails.abilities.map((a) => a.ability.name).join(", "),
      bgColor: typeColors[pokemonDetails.types[0].type.name] || "#A8A878",
      stat1: pokemonDetails.stats[0].base_stat,
      stat2: pokemonDetails.stats[1].base_stat,
      stat3: pokemonDetails.stats[2].base_stat,
      stat4: pokemonDetails.stats[3].base_stat,
      stat5: pokemonDetails.stats[4].base_stat,
      stat6: pokemonDetails.stats[5].base_stat,
      types: pokemonDetails.types,
      pokemonId: pokemonDetails.id,
    };
  }