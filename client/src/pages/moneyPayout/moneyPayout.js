import React, { useState} from 'react';
import { API } from '../../config/api'
import '../../styles/moneyPayout.css';
import axios from '../../config/axios'
import MoneyPayoutForm from './moneyPayoutForm'
import MoneyPayoutResponse from './MoneyPayoutResponse';
import ErrorHandler from '../../components/errorhandler/ErrorHandler';


const MoneyPayout = () => {
    const [error, setError] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const username = localStorage.getItem('username')
    const token = localStorage.getItem('accessToken')


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
                    setError('Transakcję przeprowadzono poprawnie!')
                  }
                setIsLoaded(true)
            }catch(err){
                setIsLoaded(true)
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

        return(
            <div>
                {username !== null && token !== null ? !isSubmitted ? <MoneyPayoutForm submitForm={submitForm} /> : <MoneyPayoutResponse isLoaded={isLoaded} msg={error}/> : <ErrorHandler msg={process.env.REACT_APP_FORBIDDEN}/>}
            </div>        
            )
    }
  
  export default MoneyPayout;