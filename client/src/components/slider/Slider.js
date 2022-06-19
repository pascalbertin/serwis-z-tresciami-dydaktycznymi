import React, { useEffect, useState } from 'react';
import SliderContent from './SliderContent';
import Dots from './Dots';
import Arrows from './Arrows';
import SliderImage from './SliderImage';
import './slider.css';

const len = SliderImage.length - 1;

function Slider(props) {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(activeIndex === len ? 0 : activeIndex + 1);
        }, 5000);
        return () => clearInterval(interval);
    }, [activeIndex]);

    return (
        <div className='slider-container'>
            <h2 className='main-slide-text'>Przykładowe kursy</h2>
            <SliderContent activeIndex={activeIndex} sliderImage={SliderImage}  />
            <Arrows
                prevSlide={() =>
                    setActiveIndex(activeIndex < 1 ? len : activeIndex - 1)
                }
                nextSlide={() =>
                    setActiveIndex(activeIndex === len ? 0 : activeIndex + 1)
                }
            />
            <Dots
                activeIndex={activeIndex}
                SliderImage={SliderImage}
                onClick={(activeIndex) => setActiveIndex(activeIndex)}
            />
        </div>
    );
}

export default Slider;