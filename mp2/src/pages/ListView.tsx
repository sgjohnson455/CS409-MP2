import React, { useEffect, useState } from "react";
import { getPokemonList } from "../api/pokemonApi";
import { Link } from "react-router-dom";

import "../styling/ListView.css";

const ListView: React.FC = () => {
    const [pokemons, setPokemons] = useState<{ name: string; url: string }[]>([]);
    const [search, setSearch] = useState("");

    // fetch pokemon list (200 entries), call setter
    useEffect(() => {
        getPokemonList(200).then(setPokemons);
    }, []);


    const filtered = pokemons.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            {/* searchbar */}
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="search-input"
            />

            {/* bulleted pokemon list */}
            <ul>
                {filtered.map(p => (
                    <li key={p.name} className="pokemon-list-item">
                        <Link to={`/pokemon/${p.name}`} className="pokemon-link">
                            {p.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListView;