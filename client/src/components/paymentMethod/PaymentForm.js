import React, {useState} from 'react';
import PaymentValidator from '../../validators/Payment'
import PaymentHandler from './PaymentHandler'
import '../../styles/Form.css';
import blik from '../../assets/images/logos/blik_logo.png'
import payU from '../../assets/images/logos/PayU_logo.png'
import paysafecard from '../../assets/images/logos/paysafecard_logo.png'
import p24 from '../../assets/images/logos/przelewy24_logo.png'

const PaymentForm = ({submitForm}) => {
    const idParam = window.location.search;
    const id = idParam.substring(7);
    const [isChecked, setIsChecked] = useState(false);
  
    const {updateHandler, values, submitHandler, errors} = PaymentHandler(submitForm, PaymentValidator);

    const handleOnChange = () => {
        setIsChecked(!isChecked);
    };


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
                            id="przelewy24"
                            name="topping"
                            value="przelewy24"
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
            </form>
        </div>
        );
  }
  
  export default PaymentForm;