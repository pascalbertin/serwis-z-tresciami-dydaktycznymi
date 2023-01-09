import React, { useState } from 'react';
import '../../styles/PaymentMethod.css';
import PaymentResponse from '../../components/paymentMethod/PaymentResponse';
import PaymentForm from '../../components/paymentMethod/PaymentForm';
import axios from '../../config/axios';
import { API } from '../../config/api'

const PaymentMethod = () => {
    const idParam = window.location.search;
    const id = idParam.substring(7);
  
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [values, setValues] = useState({})
  
    async function submitForm(isValid, values){
      if (isValid){
        setIsSubmitted(true);
        setValues(values);
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

        const response = await axios.post(API.payu, {...values},
        {
          headers: { 
               'Content-Type': 'application/json'},
          });
          setTimeout(window.location.replace(response.data['link']), 2000)
      }else{
        setIsSubmitted(false);
        setValues({});
      }
        
    }
    return (
      <div>
          {!isSubmitted ? <PaymentForm submitForm={submitForm} /> : <PaymentResponse />}
      </div>
    )
}

export default PaymentMethod;