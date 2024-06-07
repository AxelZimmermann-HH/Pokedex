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
    <div class="pokemon-card" id="card${i}" onclick="showPokemonLayer(${i}, '${pokemon.name}', 
      '${detailedInfo.sprites.other.home.front_default}', ${detailedInfo.height}, ${detailedInfo.weight}, 
      ${detailedInfo.base_experience}, '${abilities}', '${bgColor}')">
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
  

  function createLayerHTML(name, imageUrl, height, weight, baseExperience, abilities, bgColor) {
    // Dynamisches Hinzufügen des CSS für die Pseudo-Klasse
    addDynamicPseudoClassStyle('.container2::before', `background-color: ${bgColor};`);
  
    return `<div class="innerLayer">
      <div class="container1">
          <div class="layer-header">
              <p class="pokeName">${name}</p>
              <img class="icon" src="/img/icons/xmark-white.svg" onclick="closePokemonLayer()" alt="">
          </div>
      </div>
      <div class="container2" style="background-color: ${bgColor};">
          <div class="layer-main-img">
              <img src="${imageUrl}" alt="${name}">
          </div>
          <div class="navbar">
              <button class="button-nav">MAIN</button>
              <button class="button-nav">STATS</button>
              <button class="button-nav">EVO CHAIN</button>
          </div>
          <div id="info-content">
              <table>
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
          </div>
      </div>
    </div>`;
  }
  

  
  
  

