
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from './../../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function BookDetailsPage() {
  const { id } = useParams();

  
  const sampleBook = {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'A novel set in the Jazz Age about the American dream...',
    reviews: [
      { user: 'Alice', comment: 'Loved it!', rating: 5 },
      { user: 'Bob', comment: 'A classic.', rating: 4 },
    ],
  };

  const [review, setReview] = useState({ user: '', comment: '', rating: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      await addDoc(collection(db, 'Review'), {
        user: review.user,
        comment: review.comment,
        rating: Number(review.rating),
        createdAt: new Date(),
      });

      alert('Review submitted!');
      setReview({ user: '', comment: '', rating: '' });
    } catch (error) {
      console.error('Error adding review: ', error);
      alert('Failed to submit review.');
    }
  };

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
          overflowY: 'auto',
          padding: '40px 50px',
          boxSizing: 'border-box',
          maxWidth: 700,
          backgroundColor: '#fff',
          boxShadow: '2px 0 12px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h1 style={{ color: '#333', marginBottom: 10 }}>Book ID: {id}</h1>
        <h2 style={{ color: '#222', marginTop: 0 }}>{sampleBook.title}</h2>
        <p style={{ fontStyle: 'italic', color: '#555', marginTop: 0, marginBottom: 25 }}>
          by {sampleBook.author}
        </p>
        <p style={{ lineHeight: 1.6, color: '#444', marginBottom: 40 }}>{sampleBook.description}</p>

        <h2 style={{ borderBottom: '2px solid #0077cc', paddingBottom: 8, marginBottom: 20 }}>
          Reviews
        </h2>
        <ul style={{ listStyle: 'none', padding: 0, marginBottom: 40, flexGrow: 1 }}>
          {sampleBook.reviews.map((r, i) => (
            <li
              key={i}
              style={{
                padding: '15px 20px',
                borderBottom: '1px solid #ddd',
                backgroundColor: i % 2 === 0 ? '#fff' : '#f0f4f8',
                borderRadius: 6,
                marginBottom: 12,
              }}
            >
              <strong style={{ color: '#0077cc' }}>{r.user}</strong>{' '}
              <span style={{ color: '#888' }}>({r.rating}/5)</span>
              <p style={{ marginTop: 6, color: '#333' }}>{r.comment}</p>
            </li>
          ))}
        </ul>

        <h2 style={{ borderBottom: '2px solid #0077cc', paddingBottom: 8, marginBottom: 20 }}>
          Add a Review
        </h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <input
            type="text"
            placeholder="Your Name"
            value={review.user}
            onChange={(e) => setReview({ ...review, user: e.target.value })}
            style={{
              marginBottom: 20,
              padding: '12px 15px',
              fontSize: 16,
              borderRadius: 8,
              border: '1.5px solid #ccc',
              transition: 'border-color 0.3s',
            }}
            required
            onFocus={(e) => (e.target.style.borderColor = '#0077cc')}
            onBlur={(e) => (e.target.style.borderColor = '#ccc')}
          />
          <textarea
            placeholder="Your Comment"
            value={review.comment}
            onChange={(e) => setReview({ ...review, comment: e.target.value })}
            style={{
              marginBottom: 20,
              padding: 15,
              fontSize: 16,
              borderRadius: 8,
              border: '1.5px solid #ccc',
              height: 100,
              resize: 'vertical',
              transition: 'border-color 0.3s',
            }}
            required
            onFocus={(e) => (e.target.style.borderColor = '#0077cc')}
            onBlur={(e) => (e.target.style.borderColor = '#ccc')}
          />
          <input
            type="number"
            placeholder="Rating (1-5)"
            value={review.rating}
            onChange={(e) => setReview({ ...review, rating: e.target.value })}
            min="1"
            max="5"
            style={{
              marginBottom: 30,
              padding: '12px 15px',
              fontSize: 16,
              width: 120,
              borderRadius: 8,
              border: '1.5px solid #ccc',
              transition: 'border-color 0.3s',
            }}
            required
            onFocus={(e) => (e.target.style.borderColor = '#0077cc')}
            onBlur={(e) => (e.target.style.borderColor = '#ccc')}
          />
          <button
            type="submit"
            style={{
              padding: '15px',
              fontSize: 18,
              color: '#fff',
              backgroundColor: '#0077cc',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#005fa3')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#0077cc')}
          >
            Submit Review
          </button>
        </form>
      </div>

      <div
        style={{
          flex: 1,
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </div>
  );
}
