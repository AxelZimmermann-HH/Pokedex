function createTypeIcons(typesHTML, detailedInfo, j) {
    let typeName = detailedInfo.types[j].type.name;
    return typesHTML += `
      <div class="type-icon-wrapper">
        <img src="./img/types/${typeName}.png" alt="${typeName}" class="type-icon">
      </div>
    `;
  }
  


  function createCardHTML(i, pokemon, bgColor, detailedInfo, typesHTML) {
    let abilities = detailedInfo.abilities.map(a => a.ability.name).join(', ');
    
    // Erzeugen einer helleren und dunkleren Version der bgColor
    let lighterColor = lightenDarkenColor(bgColor, 40);
    let darkerColor = lightenDarkenColor(bgColor, -40);
  
    return `
      <div class="pokemon-card" id="card${i}" onclick="showPokemonLayer(${i}, '${pokemon.name}', '${detailedInfo.id}',
        '${detailedInfo.sprites.other.home.front_default}', '${detailedInfo.sprites.other.home.front_default}', 
        ${detailedInfo.height}, ${detailedInfo.weight}, ${detailedInfo.base_experience}, '${abilities}', '${bgColor}', '${detailedInfo.stats[0].base_stat}', 
        '${detailedInfo.stats[1].base_stat}', '${detailedInfo.stats[2].base_stat}', 
        '${detailedInfo.stats[3].base_stat}', '${detailedInfo.stats[4].base_stat}', 
        '${detailedInfo.stats[5].base_stat}', ${detailedInfo.id})">
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
    // Dynamisches Hinzufügen des CSS für die Pseudo-Klasse
    addDynamicPseudoClassStyle('.container2::before', `background-color: ${bgColor};`);
  
    return `<div class="innerLayer">
      <div class="container1">
        <div class="layer-header">
          <p class="pokeName">${name}</p>
          <p class="pokeName" onclick="previousPokemon()"><</p>
          <p class="pokeName" onclick="nextPokemon()">></p>
          <div class="close-layer" onclick="closePokemonLayer()">
            <img class="icon" src="./img/icons/xmark-white.svg" alt="">
          </div>
        </div>
      </div>
      <div class="container2" style="background-color: ${bgColor};">
        <div class="layer-main-img">
          <img src="${imageUrl}" alt="${name}">
        </div>
        <div class="layer-number pokeName">
          <p>#${number}</p>
        </div>
        <div class="navbar">
          <button class="button-nav" id="button1" onclick="showMainInfos('${height}', '${weight}', '${baseExperience}', '${abilitiesHTML}')">MAIN</button>
          <button class="button-nav" id="button2" onclick="showStats('${bgColor}', '${stat1}', '${stat2}', '${stat3}', '${stat4}', '${stat5}', '${stat6}')">STATS</button>
          <button class="button-nav" id="button3" onclick="showEvolutionImages(${pokemonId})">EVO CHAIN</button>
        </div>
        <div id="info-content"></div>
        <div id="evolution-chain">
          <h3>Evolution Chain</h3>
          <!-- Evolution chain images will be inserted here -->
        </div>
      </div>
    </div>`;
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
  
  function createStats(bgColor, stat1, stat2, stat3, stat4, stat5, stat6) {
    return `
    <div>
    <div class="stat-container">
    <div class="stat-name">HP:</div>
    <div class="stat-bar">
    <div class="stat-bar-inner" style="--value: calc(${stat1} / 255 * 100%); width: calc(${stat1} / 255 * 100%); background-color: ${bgColor};"></div>
        <div class="stat-value">${stat1}</div>
    </div>
</div>
<div class="stat-container">
    <div class="stat-name">Attack:</div>
    <div class="stat-bar">
    <div class="stat-bar-inner" style="--value: calc(${stat2} / 255 * 100%); width: calc(${stat2} / 255 * 100%); background-color: ${bgColor};"></div>
        <div class="stat-value">${stat2}</div>
    </div>
</div>
<div class="stat-container">
    <div class="stat-name">Defense:</div>
    <div class="stat-bar">
    <div class="stat-bar-inner" style="--value: calc(${stat3} / 255 * 100%); width: calc(${stat3} / 255 * 100%); background-color: ${bgColor};"></div>
        <div class="stat-value">${stat3}</div>
    </div>
</div>
<div class="stat-container">
    <div class="stat-name">Special Attack:</div>
    <div class="stat-bar">
    <div class="stat-bar-inner" style="--value: calc(${stat4} / 255 * 100%); width: calc(${stat4} / 255 * 100%); background-color: ${bgColor};"></div>
        <div class="stat-value">${stat4}</div>
    </div>
</div>
<div class="stat-container">
    <div class="stat-name">Special Defence:</div>
    <div class="stat-bar">
    <div class="stat-bar-inner" style="--value: calc(${stat5} / 255 * 100%); width: calc(${stat5} / 255 * 100%); background-color: ${bgColor};"></div>
        <div class="stat-value">${stat5}</div>
    </div>
</div>
<div class="stat-container">
    <div class="stat-name">Speed:</div>
    <div class="stat-bar">
    <div class="stat-bar-inner" style="--value: calc(${stat6} / 255 * 100%); width: calc(${stat6} / 255 * 100%); background-color: ${bgColor};"></div>
        <div class="stat-value">${stat6}</div>
    </div>
</div>
</div>
    `
}


function createEvolution(imageUrls, names) {
  let imagesHtml = '';

  for (let i = 0; i < imageUrls.length; i++) {
    imagesHtml += `
      <div class="evo-stage">
        <img src="${imageUrls[i]}" alt="Pokémon Evolution Stage ${i + 1}">
        <div class="name">${names[i]}</div>
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


