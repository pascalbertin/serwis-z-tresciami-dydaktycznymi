import React from "react";
import './Categories.css';

const Categories = () => {
    return (  
        <div className="category-menu">
            <h2 className="category-text">Kategorie</h2>
            <div className="category-menu-container">
                    <div className="row">
                        <div className='square-button'>Matematyka</div>
                        <div className='square-button'>Język polski</div>
                        <div className='square-button'>Język angielski</div>
                        <div className='square-button'>Informatyka</div>
                    </div>
                    <div className="row">
                        <div className='square-button'>Biologia</div>
                        <div className='square-button'>Chemia</div>
                        <div className='square-button'>Fizyka</div>
                        <div className='square-button'>Historia</div>
                    </div>
                    <div className="row">
                        <div className='square-button'>Geografia</div>
                        <div className='square-button'>Muzyka</div>
                        <div className='square-button'>Język niemiecki</div>
                        <div className='square-button'>Podstawy przedsiębiorczości</div>
                    </div>
            </div>
        </div>
    );
}
 
export default Categories;