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
var time = 25;

function Slider() {
    const [activeIndex, setActiveIndex] = useState(0);

    async function checkUser() {
        const response = await axios.get(API.course + '?subject=Matematyka',{
            headers: { 
                'Accept': 'application',
                'Content-Type': 'application/json'},
            });
        sliderData = response?.data;
        time = 5000;
    }

    window.onload = checkUser();

    useEffect(() => {
       // checkUser();
        // auto changing slides
         const interval = setInterval(() => {
             setActiveIndex(activeIndex === len ? 0 : activeIndex + 1);
         }, time);
        return () => clearInterval(interval);
    }, [activeIndex]);

    return (
        <div className='slider-container items-center'>
            <div className="md:flex hidden flex-col pt-24 px-20 pl-12 bg-second">
                <div className='appbar-container flex-row pb-48 justify-around w-full'>
                    <div className='flex flex-col w-6/12 xl:pl-24'>
                        <h2 className='xl:text-5xl md:text-4xl pt-40 text-first'>Obejrzyj i zdaj z Tutors Alpha!</h2>
                        <h2 className='pt-5 text-black text-sm md:text-lg xl:text-xl pb-12 xl:w-10/12 w-11/12 py-8'>
                            Na stronie znajdziesz kursy z przedmiotów ogólnokształcących dla szkół podstawowych i ponadpodstawowych.
                        </h2>
                        <button className='py-4 px-8 left-start-button bg-first text-white text-center xl:text-xl rounded-3xl xl:w-9/12 text-sm md:text-md w-11/12'>
                            Zacznij już dziś!
                        </button>
                    </div>
                    <div className='w-6/12'>
                        <img className="right-side-image xl:w-full xl:h-full xl:mt-0 h-4/6 mt-36" src={study}></img>
                    </div>
                </div>
            </div>
            <div className="md:hidden flex bg-second">
            <div className='appbar-container flex-col mt-10 pb-24 w-full items-center'>
                    <div className='w-11/12'>
                        <img className="right-side-image h-full w-full" src={study}></img>
                    </div>
                    <div className='flex flex-col w-10/12 pt-5 items-center'>
                        <h2 className='md:text-4xl text-2xl text-first text-center'>Obejrzyj i zdaj z Tutors Alpha!</h2>
                        <h2 className='pt-5 text-black text-sm pb-12 w-11/12 py-8 text-center'>
                            Na stronie znajdziesz kursy z przedmiotów ogólnokształcących dla szkół podstawowych i ponadpodstawowych.
                        </h2>
                        <button className='py-4 bg-first text-white text-center rounded-3xl text-sm w-9/12'>
                            Zacznij już dziś!
                        </button>
                    </div>
                </div>
            </div>

            <h2 className='main-slide-text text-5xl'>Przykładowe kursy</h2>
            <div className="category-column mt-6 lg:mt-0">
                <Link to={`/courses?subject=Matematyka`}>
                    <button className="category-column-text-button">Matematyka</button>
                </Link>
                <Link to={`/courses?subject=Polski`}><button className="category-column-text-button">Język polski</button></Link>
                <Link to={`/courses?subject=Angielski`}><button className="category-column-text-button">Język angielski</button></Link>
                <Link to={`/courses?subject=Informatyka`}><button className="category-column-text-button hidden md:block">Informatyka</button></Link>
                <Link to={`/courses?subject=Biologia`}><button className="category-column-text-button">Biologia</button></Link>
                <Link to={`/courses?subject=Fizyka`}><button className="category-column-text-button hidden md:block">Fizyka</button></Link>
                <Link to={`/courses?subject=Chemia`}><button className="category-column-text-button hidden sm:block">Chemia</button></Link>
                <Link to={`/courses?subject=Historia`}><button className="category-column-text-button hidden sm:block">Historia</button></Link>
            </div>
            <div className='slider-row flex md:hidden'>
                <SliderContent activeIndex={activeIndex} sliderImage={sliderData}  onClick={sliderData.title}/>
            </div>
            <div className='slider-row hidden md:flex'>
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