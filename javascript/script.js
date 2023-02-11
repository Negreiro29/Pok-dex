const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;
const generetePokemonPromises = () => Array(20).fill().map((_, index) => 
    fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const generateHTML = pokemons => pokemons.reduce((accumulator, {name, id, types}) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name)
    accumulator += `
        <li class="card ${elementTypes[0]}">
            <img class="card-image" alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif"/>
            <h2 class="card-title">${id}.${name}</h2>
            <p class="card-subtitle">${elementTypes.join(' | ')}</p>
        </li>
    `
    return accumulator
}, '')

/*const searchPokemon = (event, getPokemonUrl) => {
    const result = event.document.querySelector('.search_pokemon')
    if(result == `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`){
        result =  `
            <li class="card ${elementTypes[0]}">
                <img class="card-image" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.name.toLowerCase()}.gif"/>
                <h2 class="card-title">${id}.${pokemon.name}</h2>
                <p class="card-subtitle">${elementTypes.join(' | ')}</p>
            </li>
        `
        console.log(result)
    }
}*/

const searchPokemon = () => {
    const resultSearch = document.querySelector(".search_pokemon")
        .addEventListener('submit', () => {
            console.log(resultSearch.value)
        })
}

const insertPokemonsInToPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons
}
  
const pokemonPromises = generetePokemonPromises()

Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonsInToPage)