import React from 'react'
import Loading from '../loading/Loading'
import ErrorHandler from '../errorhandler/ErrorHandler'

const PaymentResponse = ({error}) => {

  return (
    error ? <ErrorHandler msg={error} /> : <Loading />
  )
}

export default PaymentResponse