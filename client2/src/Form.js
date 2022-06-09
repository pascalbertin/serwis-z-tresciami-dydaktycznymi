import React, {useState} from 'react'
import FormSignup from './FormSignup'
import FormPositive from './FormPositive'

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)

  function submitForm(){
      setIsSubmitted(true);
  }
  return (
    <div>
        {!isSubmitted ? <FormSignup submitForm={submitForm} /> : <FormPositive />}
    </div>
  )
}

export default Form;