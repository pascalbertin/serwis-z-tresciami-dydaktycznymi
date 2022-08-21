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
                            <li>Moje konto</li>
                            <li>Kontakt</li>
                            <li>Zakup kursu</li>
                        </ul>
                    </div>
                    <div className="col">
                        <h4>NAUCZANIE</h4>
                        <ul className="list-unstyled">
                            <li>Zostań nauczycielem</li>
                            <li>Dodawanie kursu</li>
                            <li>Modyfikacja kursu</li>
                            <li>Usuwanie kursu</li>
                        </ul>
                    </div>
                    <div className="col">
                        <h4>KATEGORIE</h4>
                        <ul className="list-unstyled">
                            <li>Matematyka</li>
                            <li>Język polski</li>
                            <li>Język angielski</li>
                            <li>Informatyka</li>
                            <li>Fizyka</li>
                        </ul>
                    </div>
                    <div className="col">
                        <h4>MAPA STRONY</h4>
                        <ul className="list-unstyled">
                            <li>Strona główna</li>
                            <li>Kursy</li>
                            <li>Rejestracja</li>
                            <li>Logowanie</li>
                            <li>Kontakt</li>
                        </ul>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <p className="col-sm">
                        TUTORS ALPHA &copy;   {new Date().getFullYear()}  |   Polityka prywatności  |  Regulamin  |   Konto
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Footer;