// src/App.jsx
import React from 'react';
import BookCard from './components/BookCard';
import './App.css';
import './Reset.css';
import './animatedLink.css';
import { booksData } from './BooksData';
import AnimatedHeader from './components/AnimatedHeader';



function App() {
  return (
    <div className = "main-container">
      <AnimatedHeader />
      <div className="books-flex">
        {booksData.map(book => (
          <div key={book.id} className="book-wrapper">
            <BookCard
              containerId={book.id}
              frontCoverUrl={book.frontCover}
              backCoverUrl={book.backCover}
              spineUrl={book.spine}
              bgColor={book.backgroundColor}
              textColor = {book.textColor}
              bookColor={book.bookColor}
              particleColor={book.particleColor}
              pngColor={book.pngColor}
              shaderCode={book.shaderCode}
              title={book.title}
              author={book.author}
              review={book.review}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;