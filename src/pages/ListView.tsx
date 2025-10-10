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
    const [sortByDexNum, setSortByDexNum] = useState(false);

    // fetch pokemon list (500 entries), call setter
    useEffect(() => {
        getPokemonList(500).then(setPokemons);
    }, []);

    // get the pokemon number from url
    const getDexNum = (url: string): number => {
        const parts = url.split("/");
        const dexnum = parts[parts.length - 2];
        return Number(dexnum);
    };

    // filtering
    const filtered = pokemons.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    // more advanced filtering
    const sortedPokemons = [...filtered].sort((a, b) => {
        if (sortByDexNum) {
            return sortOrder === 'asc'
                ? getDexNum(a.url) - getDexNum(b.url)
                : getDexNum(b.url) - getDexNum(a.url);
        } else {
            return sortOrder === 'asc'
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
        }
    });

    // toggle between ascending and descending
    const handleToggleSort = () => {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    // toggle if sorting by number or alphabetical
    const handleToggleSortType = () => {
        setSortByDexNum(!sortByDexNum);
        setSortOrder('asc'); // reset order to ascending when switching type
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

                {/* type of sort button */}
                <button onClick={handleToggleSortType} className="sort-button">
                    {sortByDexNum ? "Sort by Name 🅰️" : "Sort by Number #️⃣"}
                </button>
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
                                <div className="name-num">
                                    {p.name}
                                    <h3>#{getDexNum(p.url)}</h3>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div >
    );
};

export default ListView;