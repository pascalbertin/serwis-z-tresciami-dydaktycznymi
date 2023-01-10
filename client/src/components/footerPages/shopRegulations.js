const ShopRegulation = () => {
    const onButtonClick = () => {
        // using Java Script method to get PDF file
        fetch('SamplePDF.pdf').then(response => {
            response.blob().then(blob => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL(blob);
                // Setting various property values
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = 'Regulamin_TutorsAlpha.pdf';
                alink.click();
            })
        })
    }
    return (
      <div className="form-container">
        <div className="column">
            <h1>
                REGULAMIN SKLEPU
            </h1>
            <button onClick={onButtonClick}>
                Pobierz regulamin
            </button>
        </div>
      </div>
    )
  }
  
  export default ShopRegulation;