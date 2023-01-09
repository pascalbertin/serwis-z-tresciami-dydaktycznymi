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
                    <Link to={`/course/?title=${slide.title}`}>
                    <div className="slider-image-container">
                            <img className="slide-image w-64 h-64 lg:w-80 lg:h-72 xl:w-96 xl:h-80" src={slide.thumbnail} alt={slide.title} />
                    </div>
                    <h2 className="slide-title">{slide.title.length >= 24 ? slide.title.substring(0,24) + '...' : slide.title}</h2>
                    </Link>
                    <h3 className="slide-text">{slide.subject}</h3>

                </div>
            ))}
        </section>
    );
}

export default SliderContent;