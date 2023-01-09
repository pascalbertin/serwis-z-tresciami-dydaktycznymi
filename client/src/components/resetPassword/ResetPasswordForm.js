import React, {useState, useEffect} from 'react';
import ResetPasswordValidator from '../../validators/ResetPassword'
import ResetPasswordHandler from './ResetPasswordHandler'
import '../../styles/Form.css';

const ResetPasswordForm = ({submitForm}) => {
    const idParam = window.location.search;
    const id = idParam.substring(7);
    const [isChecked, setIsChecked] = useState(false);
  
     const {updateHandler, values, submitHandler, errors} = ResetPasswordHandler(submitForm, ResetPasswordValidator);



     return(
        <div className='payment-container'>
             <div className='payment-text'>Podaj adres e-mail na który zostanie wysłane jednorazowe hasło</div>
             <form className="form" method="post" onSubmit={submitHandler}>
                 <div className="form-container-inputs">
                     <div className='column'>
                         <label htmlFor="email" className="form-label"></label>
                         <input id="email" type="email" name="email" className="form-input" placeholder="E-mail" value={values.email} onChange={updateHandler} />
                         {errors.email && <p className='wrong-email-message'>{errors.email}</p>}
                     </div>
                 </div>
             <button className='payment-button' type="submit">
                 Resetuj hasło
             </button>
             </form>
         </div>
         );
   }
  
  export default ResetPasswordForm;