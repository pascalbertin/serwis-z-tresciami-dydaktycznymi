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
                            <li>O firmie 1</li>
                            <li>O firmie 2</li>
                            <li>O firmie 3</li>
                            <li>O firmie 4</li>
                            <li>O firmie 5</li>
                        </ul>
                    </div>
                    <div className="col">
                        <h4>NAUCZANIE</h4>
                        <ul className="list-unstyled">
                            <li>Nauczanie 1</li>
                            <li>Nauczanie 2</li>
                            <li>Nauczanie 3</li>
                            <li>Nauczanie 4</li>
                            <li>Nauczanie 5</li>
                        </ul>
                    </div>
                    <div className="col">
                        <h4>KATEGORIE</h4>
                        <ul className="list-unstyled">
                            <li>Kategoria 1</li>
                            <li>Kategoria 2</li>
                            <li>Kategoria 3</li>
                            <li>Kategoria 4</li>
                            <li>Kategoria 5</li>
                        </ul>
                    </div>
                    <div className="col">
                        <h4>MAPA STRONY</h4>
                        <ul className="list-unstyled">
                            <li>Mapa strony 1</li>
                            <li>Mapa strony 2</li>
                            <li>Mapa strony 3</li>
                            <li>Mapa strony 4</li>
                            <li>Mapa strony 5</li>
                        </ul>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <p className="col-sm">
                        NAZWA FIRMY&copy;   {new Date().getFullYear()}  |   Polityka prywatności  |  Regulamin  |   Konto
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Footer;