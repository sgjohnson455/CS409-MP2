import React, { useEffect, useState } from "react";
import { getPokemonList } from "../api/pokemonApi";
import { Link } from "react-router-dom";

import "../styling/GalleryView.css";

// list name, number, and link to detail view
interface PokemonListItem {
    name: string;
    // number: string;
    url: string;
}

const GalleryView: React.FC = () => {
    // searchable types
    //const pokemontypes = ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy']
    const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);

    // initialize with 200 entries
    useEffect(() => {
        getPokemonList(500).then(setPokemons)
    }, [])

    // get sprite url from PokeAPI sprite repository
    const getPokeSpriteUrl = (url: string) => {
        const parts = url.split("/").filter(Boolean);
        const number = parts[parts.length - 1];
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`;
    };

    return (
        <div className="gallery-container">
            <div className="gallery-grid">

                {pokemons.map((p) => (
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
