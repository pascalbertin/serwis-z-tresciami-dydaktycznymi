import React from "react";
import "./Footer.css";


const Footer = () => {
    return(
        <div className="main-footer">
            <div className="container">
                <div className="row" key={`row${4}`}>
                    <div className="col">
                        <h4>O FIRMIE</h4>
                        <ul className="list-unstyled">
                            <li>Polityka prywatności</li>
                            <li>Regulamin</li>
                            <li><a href="https://serwis-z-tresciami.herokuapp.com/login">Moje konto</a></li>
                            <li>Kontakt</li>
                            <li>Zakup kursu</li>
                        </ul>
                    </div>
                    <div className="col">
                        <h4>NAUCZANIE</h4>
                        <ul className="list-unstyled">
                            <li><a href="https://serwis-z-tresciami.herokuapp.com/register">Zostań nauczycielem</a></li>
                            <li>Dodawanie kursu</li>
                            <li>Modyfikacja kursu</li>
                            <li>Usuwanie kursu</li>
                        </ul>
                    </div>
                    <div className="col">
                        <h4>KATEGORIE</h4>
                        <ul className="list-unstyled">
                            <li><a href="https://serwis-z-tresciami.herokuapp.com/courses?subject=Matematyka">Matematyka</a></li>
                            <li><a href="https://serwis-z-tresciami.herokuapp.com/courses?subject=Polski">Język polski</a></li>
                            <li><a href="https://serwis-z-tresciami.herokuapp.com/courses?subject=Angielski">Język angielski</a></li>
                            <li><a href="https://serwis-z-tresciami.herokuapp.com/courses?subject=Informatyka">Informatyka</a></li>
                            <li><a href="https://serwis-z-tresciami.herokuapp.com/courses?subject=Fizyka">Fizyka</a></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h4>MAPA STRONY</h4>
                        <ul className="list-unstyled">
                            <li><a href="https://serwis-z-tresciami.herokuapp.com">Strona główna</a></li>
                            <li><a href="https://serwis-z-tresciami.herokuapp.com/categories">Kursy</a></li>
                            <li><a href="https://serwis-z-tresciami.herokuapp.com/register">Rejestracja</a></li>
                            <li><a href="https://serwis-z-tresciami.herokuapp.com/login">Logowanie</a></li>
                            <li>Kontakt</li>
                        </ul>
                    </div>
                </div>
                <hr />
                <div className="bottom-row">
                    <p className="col-sm">
                        TUTORS ALPHA &copy;   {new Date().getFullYear()}  |   Polityka prywatności  |  Regulamin  |   Konto
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
