import React, { useEffect } from 'react'
import axios from '../../config/axios';
import { API } from '../../config/api';
import { Link } from 'react-router-dom';

const PaymentFinal = () => {
    const title = window.location.search.substring(7);
    const error = window.location.href.indexOf("&error") > -1
    const email = localStorage.getItem('email')

    useEffect(() => {
        const generateCode = async () => {
            const response = await axios.patch(API.code + '/' + title + '/order', JSON.stringify({"email": email}), {
                headers: { 
                    'Content-Type': 'application/json'
                },
            });
            localStorage.removeItem('email')
        }

        if(!error) generateCode();
    }, [])

  return (
    !error ? 
        <div className="form-container flex-col my-0">
            <h1>Dziękujemy za zakup!</h1>
            <h1 className="mt-2">{process.env.REACT_APP_COURSE_BUY_SUCCESS}</h1>
            <a className="underline mt-2" href={`/course/?title=${title}`}>Powrót do kursu</a>
        </div>
    : 
    <div className="form-container flex-col my-0">
            <h1>Płatność nie powiodła się.</h1>
            <h1 className="mt-2">Spróbuj ponownie później.</h1>
    </div>
  )
}

export default PaymentFinal;