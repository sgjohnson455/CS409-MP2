import axios from "axios";

// Base URL for PokeAPI
const BASE_URL = "https://pokeapi.co/api/v2";

// define the types
export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: {
        front_default: string;
        [key: string]: string | null;
    };
    types: { slot: number; type: { name: string; url: string } }[];
}

export interface PokemonSpecies {
    id: number;
    name: string;
    flavor_text_entries: { flavor_text: string; language: { name: string } }[];
}

export interface PokemonListResult {
    name: string;
    url: string;
}

export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListResult[];
}

// Functions /////////////////////////////////////////////

// find single pokemon based on string
export async function getPokemonByName(name: string): Promise<Pokemon | null> {
    try {
        const response = await axios.get<Pokemon>(`${BASE_URL}/pokemon/${name}`);
        return response.data;
    } catch (error) {
        console.error("Can't fetch pokemon", error);
        return null;
    }
}

// get the description for the pokemon
export async function getPokemonSpecies(name: string): Promise<PokemonSpecies | null> {
    try {
        const response = await axios.get<PokemonSpecies>(`${BASE_URL}/pokemon-species/${name}`);
        return response.data;
    } catch (error) {
        console.error("Can't fetch species", error);
        return null;
    }
}

// obtain a list of pokemon
export async function getPokemonList(limit = 15, offset = 0): Promise<PokemonListResult[]> {
    try {
        const response = await axios.get<PokemonListResponse>(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
        return response.data.results;
    } catch (error) {
        console.error("Can't fetch list", error);
        return [];
    }
}