import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function Navigate({ search, setSearch, handleSearch }) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
  const fetchSuggestions = async () => {
    if (!search.trim()) return setSuggestions([]);
    const res = await fetch(`https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${encodeURIComponent(search)}`);
    const data = await res.json();
    setSuggestions(data[1]);
  };
  const delayDebounce = setTimeout(fetchSuggestions, 300);
  return () => clearTimeout(delayDebounce);
}, [search]);


  return (
    <Navbar expand="lg" className="bg-body-tertiary" style={{overflow: 'unset'}}>
      <Container fluid style={{overflow: 'unset'}}>
        <Navbar.Brand href="/home">Music Player</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" style={{overflow: 'unset'}}>
          <Form className="d-flex position-relative" onSubmit={e => { e.preventDefault(); handleSearch(search); }}>
  <div style={{ width: '250px', position: 'relative' }}>
    <Form.Control
      type="search"
      placeholder="Search YouTube songs..."
      className="me-2"
      aria-label="Search"
      value={search}
      onChange={e => setSearch(e.target.value)}
      style={{ backgroundColor: '#22223b', color: '#f2e9e4', border: '1px solid #9a8c98' }}
    />

    {/* 🔽 Suggestions dropdown */}
    {suggestions.length > 0 && (
      <div className="bg-dark position-absolute z-3 w-100 mt-1 rounded shadow" style={{ maxHeight: '200px', overflowY: 'auto' }}>
        {suggestions.map((suggest, i) => (
          <div
            key={i}
            className="text-light py-1 px-2 suggestion-item"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setSearch(suggest);
              setSuggestions([]);
              handleSearch(suggest);
            }}
          >
            🔎 {suggest}
          </div>
        ))}
      </div>
    )}
  </div>

  <Button
    variant="outline-light"
    style={{
      backgroundColor: '#4a4e69',
      color: '#f2e9e4',
      border: '1px solid #9a8c98',
      marginLeft: '8px',
    }}
    type="submit"
  >
    Search
  </Button>
</Form>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigate;
