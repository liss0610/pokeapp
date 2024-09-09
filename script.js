document.getElementById('pokeForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Evita que el formulario se envíe y recargue la página

    const pokeInput = document.getElementById('pokeInput').value.toLowerCase();
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`;

    if (pokeInput) {
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Pokémon no encontrado');
                }
                return response.json();
            })
            .then(data => {
                // Actualiza la tarjeta con los datos del Pokémon
                document.getElementById('pokeImage').src = data.sprites.front_default;
                document.getElementById('pokeName').textContent = data.name;
                document.getElementById('pokeHeight').textContent = data.height;
                document.getElementById('pokeWeight').textContent = data.weight;
                document.getElementById('pokeType').textContent = data.types.map(typeInfo => typeInfo.type.name).join(', ');

                // Datos adicionales
                document.getElementById('pokeGen').textContent = `Generación: ${getPokemonGeneration(data.id)}`;
                document.getElementById('pokeAtk').textContent = `Ataque: ${data.stats[1].base_stat}`;
                document.getElementById('pokeDef').textContent = `Defensa: ${data.stats[2].base_stat}`;

                document.getElementById('pokeCard').classList.remove('hidden');
            })
            .catch(error => {
                alert(error.message);
                document.getElementById('pokeCard').classList.add('hidden');
            });
    } else {
        document.getElementById('pokeCard').classList.add('hidden');
    }
});

function getPokemonGeneration(pokemonId) {
    if (pokemonId <= 151) return 1;
    if (pokemonId <= 251) return 2;
    if (pokemonId <= 386) return 3;
    if (pokemonId <= 493) return 4;
    if (pokemonId <= 649) return 5;
    if (pokemonId <= 721) return 6;
    if (pokemonId <= 809) return 7;
    return 8;
}