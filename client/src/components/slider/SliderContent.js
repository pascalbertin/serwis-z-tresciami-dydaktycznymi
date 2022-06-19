import React from "react";
import {BrowserRouter as Router, Link} from 'react-router-dom';

function SliderContent({ activeIndex, sliderImage }) {

    return (
        <section>
            {sliderImage.map((slide, index) => (
                <div
                key={index}
                className={index === activeIndex ? "slides active" : "inactive"}
                >
                    <div className="slider-image-container">
                        <Link to='/course'>
                            <img className="slide-image" src={slide.urls} alt="" />
                        </Link>
                    </div>
                    <h2 className="slide-title">{slide.title}</h2>
                    <h3 className="slide-text">{slide.description}</h3>

                </div>
            ))}
        </section>
    );
}

export default SliderContent;