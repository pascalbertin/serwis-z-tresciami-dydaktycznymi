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
        const response = await axios.patch(API.code + '/' + id + '/order', {...values},
        {
          headers: { 
               'Content-Type': 'application/json'},
          });
        console.log(response);
       
      }else{
        setIsSubmitted(false);
        setValues({});
      }
        
    }
    return (
      <div>
          {!isSubmitted ? <PaymentForm submitForm={submitForm} /> : <PaymentResponse id={id} />}
      </div>
    )
}

export default PaymentMethod;