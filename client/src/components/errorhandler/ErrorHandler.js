const ErrorHandler = ({msg, hrefUrl, hrefMsg}) => {
    return (
        <div className="form-container flex-col text-xl text-first items-center text-center my-10">{msg} <a className='underline' href={hrefUrl}>{hrefMsg}</a></div>
    );
}

export default ErrorHandler;