import React, { useEffect, useState } from "react";
import { getPokemonByName, getPokemonSpecies } from "../api/pokemonApi";
import { useParams } from "react-router-dom";
import type { Pokemon, PokemonSpecies } from "pokenode-ts";

const DetailView: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [species, setSpecies] = useState<PokemonSpecies | null>(null);

    useEffect(() => {
        if (name) {
            getPokemonByName(name).then(setPokemon);
            getPokemonSpecies(name).then(setSpecies);
        }
    }, [name]);

    if (!pokemon) return <p>Loading...</p>;

    // find description
    const description =
        species?.flavor_text_entries.find(
            entry => entry.language.name === "en"
        )?.flavor_text.replace(/\f/g, " ") || "No description available.";

    return (
        <div className="detail-card">
            <img
                src={pokemon.sprites.front_default ?? ""}
                alt={pokemon.name}
                className="front-image"
            /><img
                src={pokemon.sprites.back_default ?? ""}
                alt={pokemon.name}
                className="front-image"
            />
            <h1 className="pokemon-name">{pokemon.name}</h1>
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>Types: {pokemon.types.map(t => t.type.name).join(", ")}</p>

            <div className="pokemon-description">
                <p>{description}</p>
            </div>
        </div>
    );
};

export default DetailView;
