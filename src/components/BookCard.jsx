import React from 'react';
import Book from './Book';

const BookCard = ({ 
    containerId, 
    frontCoverUrl, 
    backCoverUrl, 
    spineUrl, 
    bgColor,
    bookColor,
    particleColor,
    pngColor,
    shaderCode}) => {
        return(
            <div className="book-card" style={{backgroundColor: bgColor}}>
                <Book
                    containerId={containerId}
                    frontCoverUrl={frontCoverUrl}
                    backCoverUrl={backCoverUrl}
                    spineUrl={spineUrl}
                    bookColor={bookColor}
                    particleColor={particleColor}
                    pngColor={pngColor}
                    shaderCode={shaderCode}
                />
                <div className = "book-card-content">
                    <h2>Book Title</h2>
                    <h3>Author Name</h3>
                    <p>Book Description</p>
                </div>
            </div>

        );
    }

export default BookCard;