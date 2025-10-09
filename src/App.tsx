// packages
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import pokeball from "./assets/Poké_Ball_icon.svg.png";

// styling
import './App.css';

// components
import ListView from "./pages/ListView";
import DetailView from "./pages/DetailView";
import GalleryView from "./pages/GalleryView";


// main app //////////////////////////
function App() {
  return (
    <Router basename="/CS409-MP2">

      <header className="header">
        <img src={pokeball} alt="pokeball" className="logo" />

        <Link to="/" className="header-link">
          Compact Pokédex
        </Link>

        {/* Tab navigation */}
        <nav className="tabs">
          <Link to="/" className="tab-link">
            List
          </Link>
          <Link to="/GalleryView" className="tab-link">
            Gallery
          </Link>
        </nav>
      </header>


      <Routes>
        {/* GalleryView */}
        <Route path='/GalleryView' element={<GalleryView />} />

        {/* ListView */}
        <Route path="/" element={<ListView />} />
        <Route path="/pokemon/:name" element={<DetailView />} />
      </Routes>
    </Router >
  );
}

export default App;