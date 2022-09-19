import React from 'react'

const PaymentResponse = ({id}) => {

    const url = "/course?id="+id
  return (
    <div className="form-container">
        <h1>Link aktywacyjny został wysłany na maila.</h1>
        <a href={url}>Wróć do kursu</a>
    </div>
  )
}

export default PaymentResponse