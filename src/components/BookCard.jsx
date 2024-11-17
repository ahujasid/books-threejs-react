import React from 'react';
import Book from './Book';

const BookCard = ({ 
    containerId, 
    frontCoverUrl, 
    backCoverUrl, 
    spineUrl, 
    bgColor,
    textColor,
    bookColor,
    particleColor,
    pngColor,
    shaderCode,
    title,
    author,
    review
    }) => {
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
                <div className = "book-card-content" style={{"color": textColor}}>
                    <h2>{title}</h2>
                    <h3>{author}</h3>
                    <p>{review}</p>
                </div>
            </div>

        );
    }

export default BookCard;