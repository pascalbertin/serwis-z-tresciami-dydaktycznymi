import React, {useEffect, useState} from 'react';
import { API } from '../../config/api'
import '../../styles/moneyPayout.css';
import axios from '../../config/axios'


const MoneyPayout = () => {
    const [priceAmount, setPriceAmount] = useState()
    const [user, setUser] = useState({})
    const username = localStorage.getItem('username')

    const getUser = async () => {
        try {
            const response = await axios.get(API.user + '/' + username , {
                headers: { 
                    'Content-Type': 'application/json'}
                });
                 setUser(response.data);
            } catch (err) {
                console.log(err);
            }
        }

    const handleInputPrice = (e)=>{
        setPriceAmount( e.target.value );
    }

    useEffect(() => {
        getUser();
    }, [])

    return(
        <div className='payment-container'>
            <div className='payment-main-text'> Stan konta: {user?.accountBalance}</div>
            <div className='payment-bottom-text'>Wpisz ile chciałbyś wypłacić z konta</div>
            <div className='row'>
                <input type="number" className='number-payout-input' value={priceAmount} step={1} min={10} onChange={handleInputPrice}></input>
                <div className='payment-price-text'>zł</div>
            </div>
            <button className='payment-button' type="submit">
                Wypłać
            </button>
        </div>
        );
  }
  
  export default MoneyPayout;