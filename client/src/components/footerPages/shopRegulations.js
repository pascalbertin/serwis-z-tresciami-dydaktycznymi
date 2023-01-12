const ShopRegulation = () => {
    const onButtonClick = () => {
        window.location.replace('https://storage.googleapis.com/tutorsalpha-thumbnails/Regulamin_TutorsAlpha.pdf')
    }

    return (
      <div className="form-container">
            <button className="bg-third text-white w-1/5 h-8 rounded-xl hover:bg-first transition-all" onClick={onButtonClick}>
                Pobierz regulamin
            </button>
      </div>
    )
  }
  
  export default ShopRegulation;