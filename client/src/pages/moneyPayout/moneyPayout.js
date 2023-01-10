import React, { useState} from 'react';
import { API } from '../../config/api'
import '../../styles/moneyPayout.css';
import axios from '../../config/axios'
import MoneyPayoutForm from './moneyPayoutForm'
import MoneyPayoutResponse from './MoneyPayoutResponse';

const MoneyPayout = () => {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [priceAmount, setPriceAmount] = useState()
    const [values, setValues] = useState({})
    const username = localStorage.getItem('username')


    async function submitForm(isValid, values) {
        console.log(values);
        if(isValid) {
            setIsSubmitted(true);
            setValues(values);
            const response = await axios.patch(API.user + '/' + username + '/withdrawMoney' , {...values},            
                {
                    headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                    'Content-Type': 'application/json'},   
                    withCredentials: true,
                 
                });
            setIsSubmitted(true);
            setValues(values);
            } else {
                setIsSubmitted(false);
                setValues({});
            }
        }

        // const handleInputPrice = (e)=>{
        //     setPriceAmount( e.target.value );
        //}  

        return(
            <div>
                {!isSubmitted ? <MoneyPayoutForm submitForm={submitForm} /> : <MoneyPayoutResponse />}
            </div>        
            )
    }
  
  export default MoneyPayout;