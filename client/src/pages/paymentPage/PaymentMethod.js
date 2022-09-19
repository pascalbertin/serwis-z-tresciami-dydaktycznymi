import React, { useState } from 'react';
import './PaymentMethod.css'
import PaymentResponse from '../../components/paymentMethod/PaymentResponse'
import PaymentForm from '../../components/paymentMethod/PaymentForm';
import axios from '../../config/axios'

const PaymentMethod = () => {
    const idParam = window.location.search;
    const id = idParam.substring(4);
  
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [values, setValues] = useState({})
  
    async function submitForm(isValid, values){
      if (isValid){
        setIsSubmitted(true);
        setValues(values);
        const response = await axios.patch('/api/student/codeGenerate',
        {id: id, ...values},
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