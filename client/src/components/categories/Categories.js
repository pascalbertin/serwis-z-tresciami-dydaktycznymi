import React from "react";
import { Link } from 'react-router-dom';


const Categories = () => {
    return (  
        <div className="category-menu">            
            <h2 className="category-text text-3xl md:text-4xl">Wybierz przedmiot</h2>
            <div className="category-menu-container flex justify-center text-center items-center">
                    <div className="row gap-4 xl:gap-2">
                        <Link to={`/courses?subject=Matematyka`} style={{ textDecoration: 'none' }}>
                            <div className='square-button hover:bg-sixth transition-all bg-second h-20 w-20 sm:w-32 sm:h-32 md:h-48 md:w-48 lg:h-64 lg:w-64 text-first text-sm sm:text-md md:text-xl lg:text-3xl hover:opacity-80 hover:rounded-3xl'>Matematyka</div>
                        </Link>
                        <Link to={`/courses?subject=Polski`} style={{ textDecoration: 'none' }}>
                            <div className='square-button hover:bg-sixth transition-all bg-second h-20 w-20 sm:w-32 sm:h-32 md:h-48 md:w-48 lg:h-64 lg:w-64 text-first text-sm sm:text-md md:text-xl lg:text-3xl hover:opacity-80 hover:rounded-3xl'>Język polski</div>
                        </Link>
                        <Link to={`/courses?subject=Angielski`} style={{ textDecoration: 'none' }}>
                            <div className='square-button hover:bg-sixth transition-all bg-second h-20 w-20 sm:w-32 sm:h-32 md:h-48 md:w-48 lg:h-64 lg:w-64 text-first text-sm sm:text-md md:text-xl lg:text-3xl hover:opacity-80 hover:rounded-3xl'>Język angielski</div>
                        </Link>
                        <Link to={`/courses?subject=Informatyka`} style={{ textDecoration: 'none' }}>
                            <div className='square-button hover:bg-sixth transition-all bg-second h-20 w-20 sm:w-32 sm:h-32 md:h-48 md:w-48 lg:h-64 lg:w-64 text-first text-sm sm:text-md md:text-xl lg:text-3xl hover:opacity-80 hover:rounded-3xl'>Informatyka</div>
                        </Link>
                    </div>
                    <div className="row gap-4 xl:gap-2">
                        <Link to={`/courses?subject=Biologia`} style={{ textDecoration: 'none' }}>
                            <div className='square-button hover:bg-sixth transition-all bg-second h-20 w-20 sm:w-32 sm:h-32 md:h-48 md:w-48 lg:h-64 lg:w-64 text-first text-sm sm:text-md md:text-xl lg:text-3xl hover:opacity-80 hover:rounded-3xl'>Biologia</div>
                        </Link>
                        <Link to={`/courses?subject=Chemia`} style={{ textDecoration: 'none' }}>
                            <div className='square-button hover:bg-sixth transition-all bg-second h-20 w-20 sm:w-32 sm:h-32 md:h-48 md:w-48 lg:h-64 lg:w-64 text-first text-sm sm:text-md md:text-xl lg:text-3xl hover:opacity-80 hover:rounded-3xl'>Chemia</div>
                        </Link>
                        <Link to={`/courses?subject=Fizyka`} style={{ textDecoration: 'none' }}>
                            <div className='square-button hover:bg-sixth transition-all bg-second h-20 w-20 sm:w-32 sm:h-32 md:h-48 md:w-48 lg:h-64 lg:w-64 text-first text-sm sm:text-md md:text-xl lg:text-3xl hover:opacity-80 hover:rounded-3xl'>Fizyka</div>
                        </Link>
                        <Link to={`/courses?subject=Historia`} style={{ textDecoration: 'none' }}>
                            <div className='square-button hover:bg-sixth transition-all bg-second h-20 w-20 sm:w-32 sm:h-32 md:h-48 md:w-48 lg:h-64 lg:w-64 text-first text-sm sm:text-md md:text-xl lg:text-3xl hover:opacity-80 hover:rounded-3xl'>Historia</div>
                        </Link>
                    </div>
                    <div className="row gap-4 xl:gap-2">
                        <Link to={`/courses?subject=Geografia`} style={{ textDecoration: 'none' }}>
                            <div className='square-button hover:bg-sixth transition-all bg-second h-20 w-20 sm:w-32 sm:h-32 md:h-48 md:w-48 lg:h-64 lg:w-64 text-first text-sm sm:text-md md:text-xl lg:text-3xl hover:opacity-80 hover:rounded-3xl'>Geografia</div>
                        </Link>
                        <Link to={`/courses?subject=Muzyka`} style={{ textDecoration: 'none' }}>
                            <div className='square-button hover:bg-sixth transition-all bg-second h-20 w-20 sm:w-32 sm:h-32 md:h-48 md:w-48 lg:h-64 lg:w-64 text-first text-sm sm:text-md md:text-xl lg:text-3xl hover:opacity-80 hover:rounded-3xl'>Muzyka</div>
                        </Link>
                        <Link to={`/courses?subject=Niemiecki`} style={{ textDecoration: 'none' }}>
                            <div className='square-button hover:bg-sixth transition-all bg-second h-20 w-20 sm:w-32 sm:h-32 md:h-48 md:w-48 lg:h-64 lg:w-64 text-first text-sm sm:text-md md:text-xl lg:text-3xl hover:opacity-80 hover:rounded-3xl'>Język niemiecki</div>
                        </Link>
                        <Link to={`/courses?subject=PP`} style={{ textDecoration: 'none' }}>
                            <div className='square-button hover:bg-sixth transition-all bg-second h-20 w-20 sm:w-32 sm:h-32 md:h-48 md:w-48 lg:h-64 lg:w-64 text-first text-sm sm:text-md md:text-xl lg:text-3xl hover:opacity-80 hover:rounded-3xl'>PP</div>
                        </Link>
                    </div>
            </div>
        </div>
    );
}
 
export default Categories;