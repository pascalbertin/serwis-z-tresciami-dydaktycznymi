import React from 'react'
import EditUserDataHandler from './EditUserDataHandler'
import EditUserDataValidator from '../../validators/EditUserData'
import { Link } from 'react-router-dom';

const EditUserDataForm = ({submitForm}) => {

    const {updateHandler, values, submitHandler, errors, avatarHandler, avatar} = EditUserDataHandler(submitForm, EditUserDataValidator);

    const token = localStorage.getItem('accessToken');
    console.log(token);

    return(
    <div className='form-container'>
        <form className='form' method='patch' onSubmit={submitHandler}>
            <h1>Tutaj możesz zmienić swoje dane</h1>
            <div className="form-container-inputs">
                <label htmlFor="bank_account" className="form-label"></label>
                <input id="bank_account" type="text" name="bank_account" className="form-input" placeholder="xx xxxx xxxx xxxx xxxx xxxx xxxx" value={values.bank_account} onChange={updateHandler}/>
                {errors.bank_account && <p>{errors.bank_account}</p>}
            </div>
            <div className="form-container-inputs">
                <label htmlFor="password" className="form-label"></label>
                <input id="password" type="password" name="password" className="form-input" placeholder="Nowe hasło" value={values.password} onChange={updateHandler} />
                {errors.password && <p>{errors.password}</p>}
            </div>
            <div className="form-container-inputs">
                <label htmlFor="passwordRepeat" className="form-label"></label>
                <input id="passwordRepeat" type="password" name="passwordRepeat" className="form-input" placeholder="Powtórz nowe hasło" value={values.passwordRepeat} onChange={updateHandler} />
                {errors.passwordRepeat && <p>{errors.passwordRepeat}</p>}
            </div>
            <div className="form-container-inputs">
                <p className='add-avatar-text'>ZMIEŃ SWÓJ AWATAR:</p>
                <label htmlFor="avatar" className="form-label"></label>
                <input className='avatar-input' id="avatar" type="file" name="avatar" accept="image/jpeg, image/png, image/svg" placeholder="Link do awatara" onChange={avatarHandler}/>
            </div>
            <button className="form-button" type="submit">Zapisz zmiany</button>
        </form>
    </div>
    );
}

export default EditUserDataForm;