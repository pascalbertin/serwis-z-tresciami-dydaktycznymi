import React from 'react';
import AddCourseValidator from '../../validators/addCourseValidator'
import AddCourseHandler from './addCourseHandler'
import '../registerForm/Form.css';

const AddCourseForm = ({submitForm}) => {
  
    const {updateHandler, values, submitHandler, errors} = AddCourseHandler(submitForm, AddCourseValidator);

    return (
      <div className="form-container">
          <form className="form" method="post" onSubmit={submitHandler}>
              <h1>Aby dodać kurs wypełnij poniższe pola</h1>
              <div className="form-container-inputs">
                  <label htmlFor="title" className="form-label"></label>
                  <input id="title" type="text" name="title" className="form-input" placeholder="Tytuł" value={values.title} onChange={updateHandler}/>
                  {errors.title && <p>{errors.title}</p>}
              </div>
  
              <div className="form-container-inputs">
                  <label htmlFor="description" className="form-label"></label>
                  <input id="description" type="text" name="description" className="form-input" placeholder="Opis" value={values.description} onChange={updateHandler}/>
                  {errors.description && <p>{errors.description}</p>}
              </div>
  
              <div className="form-container-inputs">
                  <label htmlFor="price" className="form-label"></label>
                  <input id="price" type="text" name="price" className="form-input" placeholder="Cena" value={values.price} onChange={updateHandler}/>
                  {errors.price && <p>{errors.price}</p>}
              </div>

              <div className="form-container-inputs">
                  <label htmlFor="subject" className="form-label"></label>
                  <select id="subject" name="subject" className="form-input select-input" value={values.category} onChange={updateHandler}>
                    <option disabled selected="selected" className="default">Kategoria</option>
                    <option value="test1">Test1</option>
                    <option value="test2">Test2</option>
                    <option value="test3">Test3</option>
                    <option value="test4">Test4</option>
                  </select>
                  {errors.subject && <p>{errors.subject}</p>}
              </div>

              <div className="form-container-inputs">
                  <label htmlFor="level" className="form-label"></label>
                  <select id="level" name="level" className="form-input select-input" value={values.difficulty} onChange={updateHandler}>
                    <option disabled selected="selected" className="default">Stopień trudności</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                  {errors.level && <p>{errors.level}</p>}
              </div>

              <div className="form-container-inputs">
              Plik wideo
                  <input id="video" type="file" name="video" className="file-form-input" value={values.video} onChange={updateHandler}/>
                  <label htmlFor="video" className="form-label"></label>
                  {errors.video && <p>{errors.video}</p>}
              </div>

              <div className="form-container-inputs">
              Miniaturka
                  <input id="thumbnail" type="file" name="thumbnail" className="file-form-input" value={values.thumbnail} onChange={updateHandler}/>
                  <label htmlFor="thumbnail" className="form-label"></label>
                  {errors.thumbnail && <p>{errors.thumbnail}</p>}
              </div>
  
              <button className="form-button" type="submit">Dodaj kurs</button>
          </form>
      </div>
    );
  }
  
  export default AddCourseForm;