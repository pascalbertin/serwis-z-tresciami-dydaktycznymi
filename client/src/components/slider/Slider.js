import React, { useEffect, useState } from 'react';
import SliderContent from './SliderContent';
import Dots from './Dots';
import Arrows from './Arrows';
import SliderImage from './SliderImage';
import './slider.css';
import study from '../../assets/images/study.jpg';
import { Link } from 'react-router-dom';
import axios from '../../config/axios';
import { API } from '../../config/api'
import Categories from '../categories/Categories';

const len = SliderImage.length - 1;
let sliderData = [];

function Slider() {
    const [activeIndex, setActiveIndex] = useState(0);

    async function checkUser() {
        const response = await axios.get(API.course + '?subject=Matematyka',{
            headers: { 
                'Accept': 'application',
                'Content-Type': 'application/json'},
            });
        sliderData = response?.data;
    }

    useEffect(() => {
        checkUser();
        // auto changing slides
         const interval = setInterval(() => {
             setActiveIndex(activeIndex === len ? 0 : activeIndex + 1);
         }, 5000);
        return () => clearInterval(interval);
    }, [activeIndex]);

    return (
        <div className='slider-container'>
            <div className='appbar-container'>
                <div className='left-column'>
                    <h2 className='left-main-text'>Obejrzyj i zdaj z Tutors Alpha!</h2>
                    <h2 className='left-bottom-text'>
                        Na stronie znajdziesz kursy z przedmiotów ogólnokształcących dla szkół podstawowych i ponadpodstawowych.
                    </h2>
                    <div className='left-start-button'>
                        Zacznij już dziś!
                    </div>
                </div>
                <div className='right-column'>
                    <img className="right-side-image" src={study}></img>
                </div>
            </div>
            <h2 className='main-slide-text'>Przykładowe kursy</h2>
            <div className="category-column">
                <Link to={`/courses?subject=Matematyka`}>
                    <button className="category-column-text-button">Matematyka</button>
                </Link>
                <Link to={`/courses?subject=Polski`}><button className="category-column-text-button">Język polski</button></Link>
                <Link to={`/courses?subject=Angielski`}><button className="category-column-text-button">Język angielski</button></Link>
                <Link to={`/courses?subject=Informatyka`}><button className="category-column-text-button">Informatyka</button></Link>
                <Link to={`/courses?subject=Biologia`}><button className="category-column-text-button">Biologia</button></Link>
                <Link to={`/courses?subject=Fizyka`}><button className="category-column-text-button">Fizyka</button></Link>
                <Link to={`/courses?subject=Chemia`}><button className="category-column-text-button">Chemia</button></Link>
                <Link to={`/courses?subject=Historia`}><button className="category-column-text-button">Historia</button></Link>
            </div>
            <div className='slider-row'>
               
                <SliderContent activeIndex={activeIndex < 1 ? len : activeIndex - 1} sliderImage={sliderData}  />
                <SliderContent activeIndex={activeIndex} sliderImage={sliderData}  onClick={sliderData.title}/>
                <SliderContent activeIndex={activeIndex === len ? 0 : activeIndex + 1} sliderImage={sliderData}  />

            </div>
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
            <Categories />
        </div>
        
    );
}

export default Slider;