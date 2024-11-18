import React from 'react';
import Book from './Book';

const BookCard = ({ 
    containerId, 
    frontCoverUrl, 
    backCoverUrl, 
    spineUrl, 
    bgColor,
    material,
    textColor,
    bookColor,
    particleColor,
    pngColor,
    shaderCode,
    blendMode,
    useShader,
    animationSpeed,
    title,
    author,
    review,
    onLoaded
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
                    animationSpeed={animationSpeed}
                    blendMode={blendMode}
                    useShader={useShader}
                    bookCoverMaterial={material}
                    onLoaded={() => {
                        console.log(`Book ${containerId} calling onLoaded`); // Debug log
                        onLoaded();
                      }}
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