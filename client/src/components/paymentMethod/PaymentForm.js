import React from 'react';
import PaymentValidator from '../../validators/Payment'
import PaymentHandler from './PaymentHandler'
import '../../styles/Form.css';

const PaymentForm = ({submitForm}) => {
  
    const {updateHandler, values, submitHandler, errors} = PaymentHandler(submitForm, PaymentValidator);

    return(
        <div className='payment-container'>
            <div className='payment-text'>Podaj adres e-mail i przejdź płatności </div>
            <form className="form" method="post" onSubmit={submitHandler}>
                <div className="form-container-inputs">
                    <div className='column'>
                        <label htmlFor="email" className="form-label"></label>
                        <input id="email" type="email" name="email" className="form-input" placeholder="E-mail" value={values.email} onChange={updateHandler} />
                        {errors.email && <p className='wrong-email-message'>{errors.email}</p>}
                    </div>
                </div>
            <button className='payment-button' type="submit">
                Przejdź do płatności
            </button>
            </form>
        </div>
        );
  }
  
  export default PaymentForm;