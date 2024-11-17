// src/App.jsx
import React from 'react';
import BookCard from './components/BookCard';
import './App.css';
import { booksData } from './BooksData';



function App() {
  return (
    <div className = "main-container">
      <div className='first-fold'>
        <h1>Top five books I read this year</h1>
        <h4>Because why the hell not?</h4>
      </div>
      <div className="books-flex">
        {booksData.map(book => (
          <div key={book.id} className="book-wrapper">
            <BookCard
              containerId={book.id}
              frontCoverUrl={book.frontCover}
              backCoverUrl={book.backCover}
              spineUrl={book.spine}
              bgColor={book.backgroundColor}
              bookColor={book.bookColor}
              particleColor={book.particleColor}
              pngColor={book.pngColor}
              shaderCode={book.shaderCode}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;