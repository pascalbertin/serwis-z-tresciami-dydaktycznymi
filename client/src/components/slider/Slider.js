import React, { useEffect, useState } from 'react';
import SliderContent from './SliderContent';
import Dots from './Dots';
import Arrows from './Arrows';
import SliderImage from './SliderImage';
import './slider.css';

const len = SliderImage.length - 1;
var sliderData = [];

function Slider(props) {
    const [activeIndex, setActiveIndex] = useState(0);

    async function checkUser() {
        const req = await fetch('https://serwis-z-tresciami.herokuapp.com/api/course/manageCourseBySubject?subject=' + 'Matematyka', {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
        })
    
        const data = await req.json()
        console.log(data);
        sliderData = data;
        
    }
    



    useEffect(() => {
        checkUser();
        // auto changing slides
        // const interval = setInterval(() => {
        //     setActiveIndex(activeIndex === len ? 0 : activeIndex + 1);
        // }, 5000);
        // return () => clearInterval(interval);
    }, [activeIndex]);

    return (
        <div className='slider-container'>
            <h2 className='main-slide-text'>Przykładowe kursy</h2>
            <h1></h1>
            <SliderContent activeIndex={activeIndex} sliderImage={sliderData}  />
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