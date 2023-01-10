import React from "react";
import "../../styles/Footer.css";
import axios from "../../config/axios";
import { useState } from "react";

const Footer = () => {
    return(
        <div className="main-footer">
            <div className="footer-container">
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
                    <div className="col hidden sm:block">
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
                    <div className="col hidden sm:block">
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
                <div className="bottom-row mt-1 pb-1">
                    <p className="col-sm text-xs text-center items-center text">
                        Tutors Alpha &copy;   {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Footer;