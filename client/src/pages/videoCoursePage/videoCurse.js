import React from 'react';
import './videoCourse.css';

const videoCourse = () => {
  
  const title = localStorage.getItem('title');
  const subject = localStorage.getItem('subject');
  const info = localStorage.getItem('info');
  return (
    <div className='video-container'>
      <div className='title-text'>{title}</div>
      <div className='category-text'>Kategoria: {subject}</div>
      <div className='description-text'>{info}</div>
    </div>
    
  );
}

export default videoCourse;