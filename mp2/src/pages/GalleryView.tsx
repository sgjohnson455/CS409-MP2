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
    const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);

    // initialize with 200 entries
    useEffect(() => {
        getPokemonList(200).then(setPokemons)
    }, [])

    // helper to extract pokedex number from url
    const getDexNumFromUrl = (url: string) => {
        const parts = url.split("/").filter(Boolean);
        return parts[parts.length - 1];
    };

    // get sprite url from PokeAPI sprite repository
    const getPokeSpriteUrl = (url: string) => {
        const id = getDexNumFromUrl(url);
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    };

    return (
        <div className="gallery-container">
            <div className="gallery-grid">

                {pokemons.map((p) => (
                    <Link key={p.name} to={`/pokemon/${p.name}`} className="gallery-card">
                        <img src={getPokeSpriteUrl(p.url)} className="gallery-img" />
                        <span className="gallery-name">{p.name}</span>
                    </Link>
                ))}

            </div>
        </div>
    );
};

export default GalleryView;
