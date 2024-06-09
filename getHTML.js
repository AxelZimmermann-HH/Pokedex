function createTypeIcons(typesHTML, detailedInfo, j) {
    let typeName = detailedInfo.types[j].type.name;
    return typesHTML += `
      <div class="type-icon-wrapper">
        <img src="/img/types/${typeName}.png" alt="${typeName}" class="type-icon">
      </div>
    `;
  }
  
  
  function createCardHTML2(i, pokemon, bgColor, detailedInfo, typesHTML) {
    let abilities = detailedInfo.abilities.map(a => a.ability.name).join(', ');
  
    return `
    <div class="pokemon-card" id="card${i}" onclick="showPokemonLayer(${i}, '${pokemon.name}', 
      '${detailedInfo.sprites.other.home.front_default}', ${detailedInfo.height}, ${detailedInfo.weight}, 
      ${detailedInfo.base_experience}, '${abilities}', '${bgColor}')">
          <div class="card-header">
              <p>#${i + 1}</p>
              <p class="pokeName">${pokemon.name}</p>
          </div>
          <div class="img-bg" style="background-color: ${bgColor}">
            <img id="bild" src="${detailedInfo.sprites.other.home.front_default}" alt="${pokemon.name}">
          </div>
          <div class="types">
            ${typesHTML}
          </div>
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
      '${detailedInfo.sprites.other.home.front_default}', ${detailedInfo.height}, ${detailedInfo.weight}, 
      ${detailedInfo.base_experience}, '${abilities}', '${bgColor}', '${detailedInfo.stats[0].base_stat}', '${detailedInfo.stats[1].base_stat}', '${detailedInfo.stats[2].base_stat}', '${detailedInfo.stats[3].base_stat}', '${detailedInfo.stats[4].base_stat}', '${detailedInfo.stats[5].base_stat}')">
          <div class="card-header">
              <p>#${i + 1}</p>
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
  

  function createLayerHTML(
    name, number, imageUrl, height, weight, baseExperience, abilities, bgColor, 
    stat1, stat2, stat3, stat4, stat5, stat6) {
    // Dynamisches Hinzufügen des CSS für die Pseudo-Klasse
    addDynamicPseudoClassStyle('.container2::before', `background-color: ${bgColor};`);
  
    return `<div class="innerLayer">
      <div class="container1">
          <div class="layer-header"">
              <p class="pokeName">${name}</p>
              <div class="close-layer" onclick="closePokemonLayer()">
              <img class="icon" src="/img/icons/xmark-white.svg" alt="">
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
              <button class="button-nav" id="button1" onclick="showMainInfos('${height}', '${weight}', '${baseExperience}', '${abilities}')">MAIN</button>
              <button class="button-nav" id="button2" onclick="showStats('${bgColor}', '${stat1}', '${stat2}', '${stat3}', '${stat4}', '${stat5}', '${stat6}')">STATS</button>
              <button class="button-nav" id="button3">EVO CHAIN</button>
          </div>
          <div id="info-content">
              
          </div>
      </div>
    </div>`;
  }
  

  function createMainInfos(height, weight, baseExperience, abilities) {
    return `<table>
    <tr>
        <td>Height:</td>
        <td>${height} cm</td>
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

