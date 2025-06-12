
import React, { useState } from 'react';
import { db, storage } from './../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

export default function AddBookPage() {
  const [book, setBook] = useState({ title: '', author: '', description: '' });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert('Please select a book cover image.');
      return;
    }

    try {
      
      const imageRef = ref(storage, `bookCovers/${uuidv4()}`);
      await uploadBytes(imageRef, imageFile);
      const downloadURL = await getDownloadURL(imageRef);

      
      const docRef = await addDoc(collection(db, 'books'), {
        ...book,
        img: downloadURL,
      });

      alert(`Book added with ID: ${docRef.id}`);
      setBook({ title: '', author: '', description: '' });
      setImageFile(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error("Error adding book: ", error);
      alert("Failed to add book.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: '#f0f4f8',
        overflow: 'hidden',
      }}
    >
      
      <div
        style={{
          flex: 1,
          maxWidth: 1000,
          background: '#fff',
          borderRadius: '0 12px 12px 0',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          padding: '40px 50px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          overflowY: 'auto',
        }}
      >
        <h1 style={{ color: '#333', marginBottom: 40, textAlign: 'center' }}>
          Add a New Book
        </h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginBottom: 20 }}
          />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Book Preview"
              style={{ width: 100, height: 140, objectFit: 'cover', borderRadius: 8, marginBottom: 20 }}
            />
          )}

          
          <input
            type="text"
            placeholder="Title"
            value={book.title}
            onChange={(e) => setBook({ ...book, title: e.target.value })}
            style={{
              marginBottom: 20,
              padding: '14px 18px',
              fontSize: 16,
              borderRadius: 8,
              border: '1.5px solid #ccc',
            }}
            required
          />

          
          <input
            type="text"
            placeholder="Author"
            value={book.author}
            onChange={(e) => setBook({ ...book, author: e.target.value })}
            style={{
              marginBottom: 20,
              padding: '14px 18px',
              fontSize: 16,
              borderRadius: 8,
              border: '1.5px solid #ccc',
            }}
            required
          />

          
          <textarea
            placeholder="Description"
            value={book.description}
            onChange={(e) => setBook({ ...book, description: e.target.value })}
            style={{
              marginBottom: 30,
              padding: 18,
              fontSize: 16,
              borderRadius: 8,
              border: '1.5px solid #ccc',
              height: 140,
              resize: 'vertical',
            }}
          />

          
          <button
            type="submit"
            style={{
              padding: '15px',
              fontSize: 18,
              backgroundColor: '#0077cc',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#005fa3')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#0077cc')}
          >
            Add Book
          </button>
        </form>
      </div>

    
      <div
        style={{
          flex: 1,
          backgroundImage:
            "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '12px 0 0 12px',
        }}
      />
    </div>
  );
}
