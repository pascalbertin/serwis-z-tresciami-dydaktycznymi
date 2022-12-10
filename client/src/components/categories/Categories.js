import React from "react";
import '../../styles/Categories.css';
import { Link } from 'react-router-dom';


const Categories = () => {
    return (  
        <div className="category-menu">            
            <h2 className="category-text">Wybierz przedmiot</h2>
            <div className="category-menu-container">
                    <div className="row">
                        <Link to={`/courses?subject=Matematyka`} style={{ textDecoration: 'none' }}>
                            <div className='square-button'>Matematyka</div>
                        </Link>
                        <Link to={`/courses?subject=Polski`} style={{ textDecoration: 'none' }}>
                            <div className='square-button'>Język polski</div>
                        </Link>
                        <Link to={`/courses?subject=Angielski`} style={{ textDecoration: 'none' }}>
                            <div className='square-button'>Język angielski</div>
                        </Link>
                        <Link to={`/courses?subject=Informatyka`} style={{ textDecoration: 'none' }}>
                            <div className='square-button'>Informatyka</div>
                        </Link>
                    </div>
                    <div className="row">
                        <Link to={`/courses?subject=Biologia`} style={{ textDecoration: 'none' }}>
                            <div className='square-button'>Biologia</div>
                        </Link>
                        <Link to={`/courses?subject=Chemia`} style={{ textDecoration: 'none' }}>
                            <div className='square-button'>Chemia</div>
                        </Link>
                        <Link to={`/courses?subject=Fizyka`} style={{ textDecoration: 'none' }}>
                            <div className='square-button'>Fizyka</div>
                        </Link>
                        <Link to={`/courses?subject=Historia`} style={{ textDecoration: 'none' }}>
                            <div className='square-button'>Historia</div>
                        </Link>
                    </div>
                    <div className="row">
                        <Link to={`/courses?subject=Geografia`} style={{ textDecoration: 'none' }}>
                            <div className='square-button'>Geografia</div>
                        </Link>
                        <Link to={`/courses?subject=Muzyka`} style={{ textDecoration: 'none' }}>
                            <div className='square-button'>Muzyka</div>
                        </Link>
                        <Link to={`/courses?subject=Niemiecki`} style={{ textDecoration: 'none' }}>
                            <div className='square-button'>Język niemiecki</div>
                        </Link>
                        <Link to={`/courses?subject=PP`} style={{ textDecoration: 'none' }}>
                            <div className='square-button'>Podstawy przedsiębiorczości</div>
                        </Link>
                    </div>
            </div>
        </div>
    );
}
 
export default Categories;