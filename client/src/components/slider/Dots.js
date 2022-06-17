import React from "react";

function Dots({ activeIndex, onClick, SliderImage}) {
    return(
        <div className="all-dots">
            {SliderImage.map((Slide, index) => (
                <span
                key={index}
                className={`${activeIndex === index ? "dot active-dot" : "dot"}`}
                onClick={() => onClick(index)}
                >
                </span>
            ))}
        </div>
    );
}

export default Dots;