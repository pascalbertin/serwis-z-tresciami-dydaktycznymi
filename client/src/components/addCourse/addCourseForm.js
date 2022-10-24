import React from 'react';
import AddCourseValidator from '../../validators/addCourse'
import AddCourseHandler from './addCourseHandler'
import '../../styles/Form.css';

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
                    <option value="Matematyka">Matematyka</option>
                    <option value="Polski">Język polski</option>
                    <option value="Angielski">Język angielski</option>
                    <option value="Niemiecki">Język niemiecki</option>
                    <option value="Informatyka">Informatyka</option>
                    <option value="Biologia">Biologia</option>
                    <option value="Chemia">Chemia</option>
                    <option value="Fizyka">Fizyka</option>
                    <option value="Historia">Historia</option>
                    <option value="Geografia">Geografia</option>
                    <option value="Muzyka">Muzyka</option>
                    <option value="PP">Podstawy przedsiębiorczości</option>
                  </select>
                  {errors.subject && <p>{errors.subject}</p>}
              </div>

              <div className="form-container-inputs">
                  <label htmlFor="level" className="form-label"></label>
                  <select id="level" name="level" className="form-input select-input" value={values.difficulty} onChange={updateHandler}>
                    <option disabled selected="selected" className="default">Stopień trudności</option>
                    <option value="1">Szkoła podstawowa: klasy 1-3</option>
                    <option value="2">Szkoła podstawowa: klasy 4-6</option>
                    <option value="3">Szkoła podstawowa: klasy 7-8</option>
                    <option value="4">Szkoła średnia: klasy 1-2</option>
                    <option value="5">Szkoła średnia: klasy 3-4</option>
                  </select>
                  {errors.level && <p>{errors.level}</p>}
              </div>
            
              <div className="form-container-inputs">
                  <label htmlFor="video" className="form-label"></label>
                  <input id="video" type="text" name="video" className="form-input" placeholder="Link do wideo" value={values.video} onChange={updateHandler}/>
                  {errors.video && <p>{errors.video}</p>}
              </div>

              <div className="form-container-inputs">
                  <label htmlFor="thumbnail" className="form-label"></label>
                  <input id="thumbnail" type="text" name="thumbnail" className="form-input" placeholder="Link do miniaturki" value={values.thumbnail} onChange={updateHandler}/>
                  {errors.thumbnail && <p>{errors.thumbnail}</p>}
              </div>
  
              <button className="form-button" type="submit">Dodaj kurs</button>
          </form>
      </div>
    );
  }
  
  export default AddCourseForm;