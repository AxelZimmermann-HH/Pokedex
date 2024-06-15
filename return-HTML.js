function createTypeIcons(typesHTML, detailedInfo, j) {
    let typeName = detailedInfo.types[j].type.name;
    return typesHTML += `
      <div class="type-icon-wrapper">
        <img src="./img/types/${typeName}.png" alt="${typeName}" class="type-icon">
      </div>
    `;
}
  


function createCardHTML(i, pokemon, bgColor, detailedInfo, typesHTML, fromSearch = false) {
  let abilities = detailedInfo.abilities.map(a => a.ability.name).join(', ');

  let lighterColor = lightenDarkenColor(bgColor, 40);
  let darkerColor = lightenDarkenColor(bgColor, -40);

  
  return `
    <div class="pokemon-card" id="card${i}" onclick="showPokemonLayer(${i}, '${pokemon.name}', '${detailedInfo.id}',
      '${detailedInfo.sprites.other.home.front_default}', '${detailedInfo.sprites.other.home.front_default}', 
      ${detailedInfo.height}, ${detailedInfo.weight}, ${detailedInfo.base_experience}, '${abilities}', '${bgColor}', '${detailedInfo.stats[0].base_stat}', 
      '${detailedInfo.stats[1].base_stat}', '${detailedInfo.stats[2].base_stat}', 
      '${detailedInfo.stats[3].base_stat}', '${detailedInfo.stats[4].base_stat}', 
      '${detailedInfo.stats[5].base_stat}', ${detailedInfo.id}, ${fromSearch})">
          <div class="card-header">
              <p class="pokeName card-number">#${detailedInfo.id}</p>
              <p class="pokeName">${pokemon.name}</p>
          </div>
          <div class="img-bg" style="background: linear-gradient(135deg, ${lighterColor}, ${darkerColor});">
            <img id="bild" src="${detailedInfo.sprites.other.home.front_default}" alt="${pokemon.name}">
          </div>
          <div class="types">
            ${typesHTML}
          </div>
      </div>
  `;
}
  


function createLayerHTML(name, number, imageUrl, imageUrl2, height, weight, baseExperience, abilitiesHTML, bgColor, stat1, stat2, stat3, stat4, stat5, stat6, pokemonId) {  
  addDynamicPseudoClassStyle('.container2::before', `background-color: ${bgColor};`);
    return `
    <div class="layer-container"> 
          <div class="mobile-layer-container">
                <div class="nav-arrows"> 
                      <p id="previous" class="pokeName-layer" onclick="previousPokemon()"><</p>
                      <p id="next" class="pokeName-layer" onclick="nextPokemon()">></p>
                </div>
                <div class="innerLayer">
                      <div class="container1">
                        <div class="layer-header">
                          <p class="pokeName-layer">${name}</p>
                          <div class="close-layer" onclick="closePokemonLayer()">
                            <img class="icon" src="./img/icons/xmark-white.svg" alt="">
                          </div>
                        </div>
                      </div>
                      <div class="container2" style="background-color: ${bgColor};">
                        <div class="layer-main-img">
                          <img src="${imageUrl}" alt="${name}">
                        </div>
                        <div class="layer-number pokeName-layer">
                          <p>#${number}</p>
                        </div>
                        <div class="navbar">
                          <button class="button-nav" id="button1" onclick="showMainInfos('${height}', '${weight}', '${baseExperience}', '${abilitiesHTML}')">MAIN</button>
                          <button class="button-nav" id="button2" onclick="showStats('${bgColor}', '${stat1}', '${stat2}', '${stat3}', '${stat4}', '${stat5}', '${stat6}')">STATS</button>
                          <button class="button-nav" id="button3" onclick="showEvolutionImages(${pokemonId})">EVO CHAIN</button>
                        </div>
                        <div id="info-content"></div>
                      </div>
                </div>
          </div>
    </div>  
    `;
}
  
  

function createMainInfos(height, weight, baseExperience, abilities) {
  return `<table>
      <tr>
          <td>Height:</td>
          <td>${height}0 cm</td>
      </tr>
      <tr>
          <td>Weight:</td>
          <td>${weight} kg</td>
      </tr>
      <tr>
          <td>Base Experience:</td>
          <td>${baseExperience}</td>
      </tr>
      <tr>
          <td>Abilities:</td>
          <td>${abilities}</td>
      </tr>
    </table>
    `
}



function createStats(bgColor, ...stats) {
  const statNames = ["HP", "Attack", "Defense", "Special Attack", "Special Defence", "Speed"];
  let statsHTML = '';

  for (let i = 0; i < stats.length; i++) {
    statsHTML += `
      <div class="stat-container">
        <div class="stat-name">${statNames[i]}:</div>
        <div class="stat-bar">
          <div class="stat-bar-inner" style="--value: calc(${stats[i]} / 255 * 100%); width: calc(${stats[i]} / 255 * 100%); background-color: ${bgColor};"></div>
          <div class="stat-value">${stats[i]}</div>
        </div>
      </div>
    `;
  }

  return `<div>${statsHTML}</div>`;
}



function createEvolution(imageUrls, names) {
  let imagesHtml = '';

  for (let i = 0; i < imageUrls.length; i++) {
    imagesHtml += `
      <div class="evo-stage">
        <img src="${imageUrls[i]}" alt="Pokémon Evolution Stage ${i + 1}">
        <p class="name">${names[i]}</p>
      </div>`;
    
    if (i < imageUrls.length - 1) {
      imagesHtml += `<img src="./img/icons/arrow.png" alt="Pfeil" class="arrow">`;
    }
  }

  return `
    <div class="evo-images">
      ${imagesHtml}
    </div>
  `;
}