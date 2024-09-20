import React, { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CustomCarousel: React.FC = () => {
    const images = [
        'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1485575301924-6891ef935dcd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1475&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div>
            <div className="carousel-container">
                <button onClick={prevSlide} className="carousel-button prev-button">
                <ArrowBackIcon />
                </button>
                <div className="image-container">
                    <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} style={{ width: '100%', borderRadius: '8px' }} />
                </div>
                <button onClick={nextSlide} className="carousel-button next-button">
                <ArrowForwardIcon />
                </button>
            </div>
        </div>
    );
};

export default CustomCarousel;
