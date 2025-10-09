import React, { useEffect, useState } from "react";
import { getPokemonList, getPokemonByName } from "../api/pokemonApi";
import { Link } from "react-router-dom";

import "../styling/GalleryView.css";

// list name, url, types (as a string)
interface PokemonListItem {
    name: string;
    url: string;
    types: string[]; // one pokemon can have multiple
}

const GalleryView: React.FC = () => {
    // searchable types
    const pokemontypes = [
        'Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice',
        'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock',
        'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy']

    const [selectedType, setSelectedType] = useState("All"); // default, show all of them

    const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);

    // load in the types
    useEffect(() => {
        async function fetchPokemons() {
            const list = await getPokemonList(250);

            const detailed = await Promise.all(
                list.map(async (p) => {
                    const data = await getPokemonByName(p.name);
                    const types = data?.types.map((t: { type: { name: string } }) =>
                        t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)
                    ) || [];
                    return { ...p, types };
                })
            );

            setPokemons(detailed);
        }
        fetchPokemons();
    }, []);


    const filteredPokemons = pokemons.filter((p) =>
        selectedType === "All" || p.types.includes(selectedType)
    );

    // get sprite url from PokeAPI sprite repository
    const getPokeSpriteUrl = (url: string) => {
        const parts = url.split("/").filter(Boolean);
        const number = parts[parts.length - 1];
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`;
    };


    return (
        <div className="gallery-container">

            <div className="type-buttons-container">
                <button
                    className={`type-button ${selectedType === "All" ? "active" : ""}`}
                    onClick={() => setSelectedType("All")}
                >
                    All
                </button>
                {pokemontypes.map((type) => (
                    <button
                        key={type}
                        className={`type-button ${selectedType === type ? "active" : ""}`}
                        onClick={() => setSelectedType(type)}
                    >
                        {type}
                    </button>
                ))}
            </div>


            <div className="gallery-grid">

                {/* map filtered pokemon */}
                {filteredPokemons.map((p: PokemonListItem) => (
                    <Link key={p.name} to={`/pokemon/${p.name}`} className="gallery-card">
                        <img
                            src={getPokeSpriteUrl(p.url)}
                            alt={p.name}
                            className="gallery-img"
                        />
                        <span className="gallery-name">{p.name}</span>
                    </Link>
                ))}
            </div>

        </div>
    );
};

export default GalleryView;
