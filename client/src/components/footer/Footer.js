import React from "react";
import "../../styles/Footer.css";


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
                            <li><a href="/login">Moje konto</a></li>
                            <li>Kontakt</li>
                            <li><a href="/categories">Zakup kursu</a></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h4>NAUCZANIE</h4>
                        <ul className="list-unstyled">
                            <li><a href="/register">Zostań nauczycielem</a></li>
                            <li><a href="/addCourse">Dodawanie kursu</a></li>
                            <li><a href="/profile">Modyfikacja kursu</a></li>
                            <li><a href="/profile">Usuwanie kursu</a></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h4>KATEGORIE</h4>
                        <ul className="list-unstyled">
                            <li><a href="/courses?subject=Matematyka">Matematyka</a></li>
                            <li><a href="/courses?subject=Polski">Język polski</a></li>
                            <li><a href="/courses?subject=Angielski">Język angielski</a></li>
                            <li><a href="/courses?subject=Informatyka">Informatyka</a></li>
                            <li><a href="/courses?subject=Fizyka">Fizyka</a></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h4>MAPA STRONY</h4>
                        <ul className="list-unstyled">
                            <li><a href="/">Strona główna</a></li>
                            <li><a href="/categories">Kursy</a></li>
                            <li><a href="/register">Rejestracja</a></li>
                            <li><a href="/login">Logowanie</a></li>
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
