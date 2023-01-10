import React, { useState} from 'react';
import { API } from '../../config/api'
import '../../styles/moneyPayout.css';
import axios from '../../config/axios'
import MoneyPayoutForm from './moneyPayoutForm'
import MoneyPayoutResponse from './MoneyPayoutResponse';
import {useNavigate, useLocation} from 'react-router-dom'


const MoneyPayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [priceAmount, setPriceAmount] = useState()
    const [values, setValues] = useState({})
    const username = localStorage.getItem('username')


    async function submitForm(isValid, values) {
        console.log(values);
        if(isValid) {
            setIsSubmitted(true);
            setValues(values);
            try{
            const response = await axios.patch(API.user + '/' + username + '/withdrawMoney' , {...values},            
                {
                    headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                    'Content-Type': 'application/json'},   
                    withCredentials: true,
                 
                });
                if(response?.status === 200){
                    setTimeout(navigate('/profile', {state: { from: location}, replace: true}), 100)
                    navigate(0)
                    setError('Tranzakcję przeprowadzono poprawnie!')
                  }
            }catch(err){
                if(!err?.response) setError('Błąd połączenia')
                else if(err.response?.status === 400) setError('Hasło jest wymagane!')
                else if(err.response?.status === 401) setError('Błąd autoryzacji')
                else setError('Błąd logowania')
            }
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