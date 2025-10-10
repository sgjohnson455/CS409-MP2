import React, { useEffect, useState } from "react";
import { getPokemonList } from "../api/pokemonApi";
import { Link } from "react-router-dom";

import "../styling/ListView.css";
import pokeballlist from "../assets/pokeballbw.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const ListView: React.FC = () => {
    const [pokemons, setPokemons] = useState<{ name: string; url: string }[]>([]);
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState('asc'); // default is ascending sort

    // fetch pokemon list (200 entries), call setter
    useEffect(() => {
        getPokemonList(500).then(setPokemons);
    }, []);

    // filtering
    const filtered = pokemons.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    // more advanced filtering
    const sortedPokemons = [...filtered].sort((a, b) => {
        if (sortOrder === "asc") {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });

    // toggle between ascending and descending
    const handleToggleSort = () => {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    return (
        <div className="listview-container">
            {/* searchbar */}

            <div className="searchbar">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="searchicon" />
                <input
                    type="text"
                    placeholder="Search for a Pokémon..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="search-input"
                />
            </div>
            <div className="sort-buttons">
                {/* sort button */}
                <button onClick={handleToggleSort} className="sort-button">
                    {sortOrder === "asc" ? "⬇️ Ascending" : "⬆️ Descending"}
                </button>
            </div>

            {/* pokemon list */}
            <ul>
                {sortedPokemons.map(p => (
                    <li key={p.name} className="pokemon-list-item">
                        <Link to={`/pokemon/${p.name}`} className="pokemon-link">
                            <div className="pokemonlist-box">
                                <img src={pokeballlist} alt="pokeball" className="pokebulletpoint" />
                                {p.name}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div >
    );
};

export default ListView;