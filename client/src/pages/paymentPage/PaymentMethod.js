import React, { useState } from 'react';
import './PaymentMethod.css'
import FormHandler from '../../components/registerForm/FormHandler'
import FormValidator from '../../validators/FormValidator'
import blik from '../../assets/images/blik_logo.png'
import payU from '../../assets/images/PayU_logo.png'
import paysafecard from '../../assets/images/paysafecard_logo.png'
import p24 from '../../assets/images/przelewy24_logo.png'


const PaymentMethod = ({submitForm}) => {

    var idParam = window.location.search;
    var id = idParam.substring(4);

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const {updateHandler, values, submitHandler, errors } = FormHandler(submitForm, FormValidator);

    const handleOnChange = () => {
        setIsChecked(!isChecked);
    };

    // const submitForm = () => {
    //     setIsSubmitted(true);
    //     fetch("https://serwis-z-tresciami.herokuapp.com/api/student/codeGenerate", {
    //         method: 'PATCH',
    //         body: JSON.stringify({
    //             _id: id,
    //             email: values.email,
    //         }),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //     })
    //     .then((response) => response.json())
    //     .then((json) => console.log(json));
    // }

    return(
    <div className='payment-container'>
        <div className='payment-text'>Podaj adres e-mail i wybierz metodę płatności </div>
        <form className="form" method="post" onSubmit={submitHandler}>
            <div className="form-container-inputs">
                <div className='column'>
                    <label htmlFor="email" className="form-label"></label>
                    <input id="email" type="email" name="email" className="form-input" placeholder="E-mail" value={values.email} onChange={updateHandler} />
                    {errors.email && <p className='wrong-email-message'>{errors.email}</p>}
                </div>
            </div>
        </form>
        <div className='payment-options'>
            <ul className='list-unstyled'>
                <li>
                    <input
                        type="radio"
                        id="blik"
                        name="topping"
                        value="BLIK"
                        checked={isChecked}
                        onChange={handleOnChange}
                        />
                    <img width={"100px"} src={blik}></img>
                </li>
                <li>
                    <input
                        type="radio"
                        id="payu"
                        name="topping"
                        value="PayU"
                        checked={isChecked}
                        onChange={handleOnChange}
                        />
                    <img width={"100px"} src={payU}></img>
                </li>
                <li>
                    <input
                        type="radio"
                        id="paysafeCard"
                        name="topping"
                        value="paysafeCard"
                        checked={isChecked}
                        onChange={handleOnChange}
                        />
                    <img width={"100px"} style={{marginLeft: 10}} src={paysafecard}></img>
                </li>
                <li>
                    <input
                        type="radio"
                        id="paysafeCard"
                        name="topping"
                        value="paysafeCard"
                        checked={isChecked}
                        onChange={handleOnChange}
                        />
                    <img width={"100px"} style={{marginLeft: 10}} src={p24}></img>
                </li>
            </ul>
        </div>
        <button className='payment-button' type="submit">
            Kup kurs
        </button>
    </div>
    );
}

export default PaymentMethod;