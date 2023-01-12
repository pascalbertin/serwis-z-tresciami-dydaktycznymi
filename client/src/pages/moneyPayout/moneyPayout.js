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
    const username = localStorage.getItem('username')


    async function submitForm(isValid, values) {
        if(isValid) {
            setIsSubmitted(true);
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
                    setError('Transakcję przeprowadzono poprawnie!')
                  }
            }catch(err){
                if(!err?.response) setError('Błąd połączenia')
                else if(err.response?.status === 400) setError('Hasło jest wymagane!')
                else if(err.response?.status === 401 || err.response?.status === 403) setError('Błąd autoryzacji')
                else if(err.response?.status === 406) setError('Nie możesz wypłacić kwoty większej niż Twoje obecne saldo!')
                else if(err.response?.status === 409) setError('Przed wypłatą środków musisz podać numer konta bankowego! Możesz to zrobić w sekcji edycji profilu.')
                else setError('Nieznany błąd')
            }
            setIsSubmitted(true);
            } else {
                setIsSubmitted(false);
            }
        }

        // const handleInputPrice = (e)=>{
        //     setPriceAmount( e.target.value );
        //}  

        return(
            <div>
                {!isSubmitted ? <MoneyPayoutForm submitForm={submitForm} /> : <MoneyPayoutResponse msg={error}/>}
            </div>        
            )
    }
  
  export default MoneyPayout;