import React, {useState} from 'react';

import '../../styles/moneyPayout.css';


const MoneyPayout = () => {
    const [priceAmount, setPriceAmount] = useState()
    
    const handleInputPrice = (e)=>{
        setPriceAmount( e.target.value );
    }
    return(
        <div className='payment-container'>
            <div className='payment-main-text'> Stan konta: {}</div>
            <div className='payment-bottom-text'>Wpisz ile chciałbyś wypłacić z konta</div>
            {/* <form className="form" method="post" onSubmit={submitHandler}> */}
                {/* <div className="form-container-inputs">
                    <div className='column'>
                        <label htmlFor="email" className="form-label"></label>
                        <input id="email" type="email" name="email" className="form-input" placeholder="E-mail" value={values.email} onChange={updateHandler} />
                        {errors.email && <p className='wrong-email-message'>{errors.email}</p>}
                    </div>
                </div>          */}
            <div className='row'>
                <input type="number" className='number-payout-input' value={priceAmount} step={1} min={10} onChange={handleInputPrice}></input>
                <div className='payment-price-text'>zł</div>
            </div>
            <button className='payment-button' type="submit">
                Wypłać
            </button>
            {/* </form> */}
        </div>
        );
  }
  
  export default MoneyPayout;