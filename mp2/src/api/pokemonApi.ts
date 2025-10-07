// using pokenode for PokeAPI with typescript support
import { PokemonClient } from "pokenode-ts";

// Create a single instance
const api = new PokemonClient();

// functions /////////////////////////////////////////////

// find single pokemon based on string
export async function getPokemonByName(name: string) {
    try {
        const data = await api.getPokemonByName(name); // returns a typed Pokémon object
        return data;
    } catch (error) {
        console.error("Can't fetch pokemon", error);
        return null;
    }
}

// get the description for the pokemon
export async function getPokemonSpecies(name: string) {
    try {
        const data = await api.getPokemonSpeciesByName(name);
        return data;
    } catch (error) {
        console.error("Can't fetch species", error);
        return null;
    }
}

// obtain a list of pokemon
export async function getPokemonList(limit = 15, offset = 0) {
    try {
        const data = await api.listPokemons(offset, limit);
        return data.results; // array of { name, url }
    } catch (error) {
        console.error("Can't fetch list", error);
        return [];
    }
}
