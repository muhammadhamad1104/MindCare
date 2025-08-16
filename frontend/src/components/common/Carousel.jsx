import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Carousel = ({ children, itemsToShow = 1, autoSlide = true, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= React.Children.count(children) - itemsToShow ? 0 : prevIndex + 1
    );
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex <= 0 ? React.Children.count(children) - itemsToShow : prevIndex - 1
    );
  };
  
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };
  
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      nextSlide();
    }
    
    if (touchStart - touchEnd < -50) {
      prevSlide();
    }
  };
  
  useEffect(() => {
    let slideInterval;
    if (autoSlide) {
      slideInterval = setInterval(nextSlide, interval);
    }
    return () => clearInterval(slideInterval);
  }, []);
  
  return (
    <div className="relative overflow-hidden">
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ 
          transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
          width: `${React.Children.count(children) * (100 / itemsToShow)}%`
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {React.Children.map(children, (child, index) => (
          <div 
            key={index} 
            className="flex-shrink-0"
            style={{ width: `${100 / itemsToShow}%` }}
          >
            {child}
          </div>
        ))}
      </div>
      
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg z-10 hover:bg-blue-50 transition-colors"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="text-blue-600" />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg z-10 hover:bg-blue-50 transition-colors"
      >
        <FontAwesomeIcon icon={faChevronRight} className="text-blue-600" />
      </button>
      
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: Math.ceil(React.Children.count(children) / itemsToShow) }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index * itemsToShow)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentIndex === index * itemsToShow 
                ? 'bg-blue-600 w-6' 
                : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;