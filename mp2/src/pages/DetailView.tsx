import React, { useEffect, useState } from "react";
import { getPokemonByName, getPokemonSpecies } from "../api/pokemonApi";
import { useNavigate, useParams } from "react-router-dom";
import type { Pokemon, PokemonSpecies } from "pokenode-ts";

import "../styling/DetailView.css";

const DetailView: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [species, setSpecies] = useState<PokemonSpecies | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (name) {
            getPokemonByName(name).then(setPokemon);
            getPokemonSpecies(name).then(setSpecies);
        }
    }, [name]);

    // loading text fr
    if (!pokemon) return <p>Loading...</p>;

    // find first description in english (and filter out form feed characters)
    const description =
        species?.flavor_text_entries.find(
            entry => entry.language.name === "en"
        )?.flavor_text.replace(/\f/g, " ") || "No description available.";

    // previous and next buttons
    const updatePrevious = () => {
        if (pokemon.id > 1) navigate(`/pokemon/${pokemon.id - 1}`)
    }

    const updateNext = () => {
        navigate(`/pokemon/${pokemon.id + 1}`)
    }


    return (
        <div className="detail-card">
            <h1 className="poke-name">{pokemon.name}</h1>

            <div className="poke-card">

                {/* front and back */}
                <img
                    src={pokemon.sprites.front_default ?? ""}
                    alt={pokemon.name}
                    className="poke-image"
                />

                <img
                    src={pokemon.sprites.back_default ?? ""}
                    alt={pokemon.name}
                    className="poke-image"
                />

                <p>Height: {pokemon.height}</p>
                <p>Weight: {pokemon.weight}</p>

                <div className="poke-type">
                    <p>{pokemon.types.map(t => t.type.name).join(", ")}</p>
                </div>

                <div className="poke-description">
                    <p>{description}</p>
                </div>

                {/* navigation buttons */}
                <div className="nav-buttons">
                    <button
                        className="nav-button" onClick={updatePrevious}
                    >
                        ←
                    </button>
                    <button className="nav-button" onClick={updateNext}>
                        →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetailView;
