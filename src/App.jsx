import React, { useState, useEffect } from 'react';
import BookCard from './components/BookCard';
import './App.css';
import './Reset.css';
import './animatedLink.css';
import { booksData } from './BooksData';
import AnimatedHeader from './components/AnimatedHeader';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"


function App() {
  const [loading, setLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);
  const loadedBooks = React.useRef(new Set()); // Just add this line

  const handleBookLoaded = (bookId) => {
    if (!loadedBooks.current.has(bookId)) { // Only count if not already loaded
      loadedBooks.current.add(bookId);
      setLoadedCount(prev => {
        const newCount = prev + 1;
        if (newCount === booksData.length) {
          setTimeout(() => setLoading(false), 500);
        }
        return newCount;
      });
    }
  };

  return (
    <>
      <div className={`main-container ${!loading ? 'loaded' : ''}`}>
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
                material={book.material}
                textColor={book.textColor}
                textAccentColor={book.textAccentColor}
                bookColor={book.bookColor}
                particleColor={book.particleColor}
                pngColor={book.pngColor}
                shaderCode={book.shaderCode}
                useShader={book.useShader}
                blendMode={book.blending}
                animationSpeed={book.animationSpeed}
                title={book.title}
                author={book.author}
                review={book.review}
                onLoaded={() => handleBookLoaded(book.id)}
              />
            </div>
          ))}
        </div>
        <Analytics />
        <SpeedInsights/>
      </div>

      {loading && (
        <div className="loader-container">
          <div className="loader">
            <div className="spinning-loader"></div>
            <p>Loading... ({Math.min(loadedCount, booksData.length)*100/booksData.length}%)</p>
          </div>
        </div>
      )}
    </>
  );
}

export default App;