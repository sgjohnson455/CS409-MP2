// packages
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// styling
import './App.css';

// components
import ListView from "./components/ListView";
import DetailView from "./components/DetailedView";


// main app //////////////////////////
function App() {
  return (
    <Router basename="CS409-MP2">

      <header className="header">
        <Link to="/" className="header-link">
          Compact Pokédex
        </Link>
      </header>

      <Routes>
        <Route path="/" element={<ListView />} />
        <Route path="/pokemon/:name" element={<DetailView />} />
      </Routes>
    </Router>
  );
}

export default App;