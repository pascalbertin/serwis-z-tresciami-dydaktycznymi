import React, { Component } from 'react';
import '../../styles/Form.css';
import axiox from 'axios';
import axios from '../../config/axios';

class AddFileForm extends Component {

  state = {
    file: null
  }

  

  handleFile(e) {

    let file = e.target.files[0];

    this.setState({file: file});
  }


  handleUpload(e) {
    let file = this.state.file;

    function uuidv4() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
    }

    let postid = uuidv4();
    // Create new file so we can rename the file
    let blob = file.slice(0, file.size, "image/jpeg");
    let newFile = new File([blob], `${postid}_post.jpeg`, { type: "image/jpeg" });
    // Build the form data - You can add other input values to this i.e descriptions, make sure img is appended last
    let formData = new FormData();
    formData.append("file", newFile);
    
    axios({
      url: 'http://localhost:3001/api/fileUpload',
      method : 'POST',
      data: formData
    });
  }

render() {
  return (
    <div>
    <h1>THE FORM</h1>

    <form>
        <div className=''>
            <label>WYBIERZ PLIK</label>
            <input type='file' name='file' accept="image/jpeg" onChange={(e) => this.handleFile(e)}/>
        </div>
        <button type='button' onClick={(e) => this.handleUpload(e)}>PRZEŚLIJ</button>
    </form>
    </div>
  );
}

}

export default AddFileForm;