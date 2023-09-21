const pokeContainer = document.querySelector(".poke-container");
const search = document.querySelector(".search");
const searchBtn = document.querySelector(".searchBtn");
const searchInput = document.querySelector(".searchInput"); 

// kaç tane pokemon olduğu değeri atama
const pokemonCount = 151;



const bg_color = {
    grass: '#8BD369',
    fire: '#FF603F',
    water: '#3399FF',
    bug: '#AABB22',
    normal: '#AAAA99',
    flying: '#9AA8FA',
    poison: '#B76EA4',
    electric: '#FFD34E',
    ground: '#E2C56A',
    fairy: '#F1A8EC',
    psychic: '#FF6EA4',
    fighting: '#C56E5C',
    rock: '#C5B679',
    dragon: '#7766EE',
    ice: '#66CCFF',
  };


  // Arama Kısmındaki Tıklanma Olayı
  searchBtn.addEventListener("click", () => {
    search.classList.toggle("active");
  });

  // İnput içine yazılanı çıkarma
  searchInput.addEventListener("input", ()=>{
    const searchValue = searchInput.value.toLowerCase();
    const pokemonName = document.querySelectorAll(".poke-name");

    // Pokemonlar İçinde Gezinme
    pokemonName.forEach((pokemonName) =>{
        if(pokemonName.innerHTML.toLowerCase().includes(searchValue)){
            pokemonName.parentElement.parentElement.style.display="block"
        } else {
            pokemonName.parentElement.parentElement.style.display="none"
        }
    })
  });


  // Pokemonları yakalama
  const fetchPokemons = async() => {
    for(let i=1; i<pokemonCount; i++){
        await getPokemon(i)
    }
  };

  // API çekme
  const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const data = await res.json()
    createPokemonCard(data)
  };

  // Her Bir Pokemonu yaratma
  const createPokemonCard = (pokemon) => {
    // Pokemon divi oluşturma
    const pokemonDiv = document.createElement("div");
    // Dive Class ekleme
    pokemonDiv.classList.add("pokemon");
    // Pokemon Numaraları Adlandırma
    const pokemonId = pokemon.id.toString().padStart(3,"0");
    // Pokemon Type Adlandırma
    const pokemonType = pokemon.types[0].type.name
    // Background Color Adlandırma
    const pokemonBg = bg_color[pokemonType]
    // Background Color Değişimi Ayarlama
    pokemonDiv.style.backgroundColor = `${pokemonBg}`
    // Kodları yazma
    const pokemonDivInnerHtml = 
    `
    <div class="image-container">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="First Pokemon">
            </div>
            <div class="poke-info">
                <span class="poke-id">${pokemonId}</span>
                <h3 class="poke-name">${pokemon.name}</h3>
                <div class="small">
                    <small class="poke-exp">
                        <i class="fa-solid fa-flask"></i>${pokemon.base_experience} exp
                    </small>
                    <small class="poke-weight">
                        <i class="fa-solid fa-flask"></i>${pokemon.weight} kg
                    </small>
                </div>
                <div class="poke-type">
                    <i class="fa-brands fa-uncharted"></i> ${pokemonType}
                </div>
            </div>
    `

    pokemonDiv.innerHTML = pokemonDivInnerHtml
    pokeContainer.appendChild(pokemonDiv)
  }

  fetchPokemons()