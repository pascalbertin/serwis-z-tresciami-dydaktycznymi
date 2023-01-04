import React from 'react';
import '../../styles/VideoCourse.css';
import ReactPlayer from 'react-player';

const videoCourse = () => {
  
  const title = localStorage.getItem('title');
  const subject = localStorage.getItem('subject');
  const info = localStorage.getItem('info');
  const link = localStorage.getItem('url');
  return (
    <div className='video-container'>
      <div className='video-player' onContextMenu={(e) => {e.preventDefault()}}>
        <ReactPlayer 
          controls
          width='1700px'
          height='863px'
          url={link}
          config={{ file: { 
            attributes: {
              controlsList: 'nodownload'
            }
          }}}>        
        </ReactPlayer>
      </div>
      <div className='title-text'>{title}</div>
      <div className='category-text'>Kategoria: {subject}</div>
      <div className='description-text'>{info}</div>
    </div>
    
  );
}

export default videoCourse;