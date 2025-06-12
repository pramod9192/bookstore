// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import HomePage from './Pages/Homepage';
import BookDetailsPage from './Pages/BookDetailpage';
import AddBookPage from './Pages/AddBookPage';

export default function App() {
  return (
    <Router>
      <nav style={{ padding: 20, backgroundColor: '#eee' }}>
        <Link to="/" style={{ marginRight: 15 }}>Home</Link>
        <Link to="/add-book" style={{ marginRight: 15 }}>Add Book</Link>
        <Link to="/book/1">Sample Book Details</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Example route with param */}
        <Route path="/book/:id" element={<BookDetailsPage />} />
        <Route path="/add-book" element={<AddBookPage />} />
      </Routes>
    </Router>
  );
}
