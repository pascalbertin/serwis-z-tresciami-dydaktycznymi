import React, {useEffect, useState} from 'react';
import MoneyPayoutHandler from './moneyPayoutHandler';
import MoneyPayoutValidator from './moneyPayoutValidator';
import '../../styles/moneyPayout.css';
import axios from '../../config/axios';
import { API } from '../../config/api'
;

const MoneyPayoutForm = ({submitForm}) => {
    const {updateHandler, values, submitHandler, errors} = MoneyPayoutHandler(submitForm, MoneyPayoutValidator);
    const [user, setUser] = useState({})
    const username = localStorage.getItem('username')

    // const handleInputPrice = (e)=>{
    //     setPriceAmount( e.target.value );
    // }
    useEffect(() => {
    const getUser = async () => {
        try {
            const response = await axios.get(API.user + '/' + username , {
                headers: { 
                    'Content-Type': 'application/json'}
                });
                setUser(response.data);
            } catch (err) {
            }
        }
        getUser();
    }, [])

    return(
        <div className='payment-container'>
            <form className='form' method='patch' onSubmit={submitHandler}>
                <div className='payment-main-text'> Stan konta: {user?.accountBalance}</div>
                <div className='payment-bottom-text'>Wpisz ile chciałbyś wypłacić z konta</div>
                <div className='form-container-inputs'>
                    <label htmlFor="moneyAmount" className="form-label"></label>
                    <input id="moneyAmount" type="text" name="moneyAmount" className='form-input' value={values.moneyAmount} onChange={updateHandler}></input>
                    {errors.moneyAmount && <p>{errors.moneyAmount}</p>}
                </div>
                <button className='payment-button' type="submit" >
                    Wypłać
                </button>
            </form>
        </div>
    )

}

export default MoneyPayoutForm;