
import React from 'react';
import { Link } from 'react-router-dom';

const sampleBooks = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', avgRating: 4.3, img: 'https://covers.openlibrary.org/b/id/7222246-L.jpg' },
  { id: 2, title: '1984', author: 'George Orwell', avgRating: 4.7, img: 'https://covers.openlibrary.org/b/id/7222241-L.jpg' },
  { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', avgRating: 4.8, img: 'https://covers.openlibrary.org/b/id/8225261-L.jpg' },
];

export default function HomePage() {
  return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: '#f9f9f9',
        overflow: 'hidden',
      }}
    >
      
      <div
        style={{
          flex: 1,
          maxWidth: 800,
          overflowY: 'auto',
          padding: '40px 50px',
          boxSizing: 'border-box',
          backgroundColor: '#fff',
          boxShadow: '2px 0 12px rgba(0,0,0,0.1)',
          borderTopRightRadius: 8,
          borderBottomRightRadius: 8,
        }}
      >
        <h1 style={{ textAlign: 'center', color: '#333', marginBottom: 40 }}>Book Store</h1>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {sampleBooks.map(book => (
            <li
              key={book.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: 15,
                borderBottom: '1px solid #ddd',
                borderRadius: 6,
                marginBottom: 20,
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                background: '#fafafa',
                transition: 'background-color 0.3s',
                cursor: 'pointer',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#e6f0fa')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#fafafa')}
            >
              <img
                src={book.img}
                alt={`${book.title} cover`}
                style={{ width: 80, height: 120, objectFit: 'cover', borderRadius: 4, marginRight: 20, flexShrink: 0 }}
              />
              <div>
                <h2 style={{ margin: '0 0 5px 0', color: '#0077cc' }}>
                  <Link to={`/book/${book.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {book.title}
                  </Link>
                </h2>
                <p style={{ margin: '5px 0', color: '#555' }}>Author: {book.author}</p>
                <p style={{ margin: '5px 0', fontWeight: 'bold', color: '#444' }}>Average Rating: {book.avgRating}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      
      <div
        style={{
          flex: 1,
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
        }}
      />
    </div>
  );
}
