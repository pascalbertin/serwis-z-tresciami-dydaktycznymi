import React from 'react'

const PaymentResponse = ({id}) => {

    const url = "/course?id="+id
  return (
    <div className="form-container">
        <h1>{process.env.REACT_APP_COURSE_BUY_SUCCESS}</h1>
        <a href={url}>Wróć do kursu</a>
    </div>
  )
}

export default PaymentResponse