import React, { useState } from 'react';
import '../../styles/PaymentMethod.css';
import PaymentResponse from '../../components/paymentMethod/PaymentResponse';
import PaymentForm from '../../components/paymentMethod/PaymentForm';
import axios from '../../config/axios';
import { API } from '../../config/api'

const PaymentMethod = () => {
    const idParam = window.location.search;
    const id = idParam.substring(7);
    const [error, setError] = useState('')
  
    const [isSubmitted, setIsSubmitted] = useState(false)
  
    async function submitForm(isValid, values){
      if (isValid){
        setIsSubmitted(true);
        localStorage.setItem('email', values.email)
        const courseObj = await axios.get(API.code + '/' + id, {
          headers: { 
               'Content-Type': 'application/json'
          },
        });

        values.title = courseObj.data.title;
        values.description = courseObj.data.description;
        values.price = courseObj.data.price;
        values.author = courseObj.data.author;
        values.subject = courseObj.data.subject;

        try{
          const response = await axios.post(API.payu, {...values},
          {
            headers: { 
                'Content-Type': 'application/json'},
            });
            window.location.replace(response.data['link'])
            setError(process.env.REACT_APP_PAYU_REDIRECT)
        }
        catch(err){
          if(!err?.response) setError(process.env.REACT_APP_SERVER_CONN_ERROR)
        }
      }else{
        setIsSubmitted(false);
      }
        
    }
    return (
      <div>
          {!isSubmitted ? <PaymentForm submitForm={submitForm} /> : <PaymentResponse msg={error}/>}
      </div>
    )
}

export default PaymentMethod;