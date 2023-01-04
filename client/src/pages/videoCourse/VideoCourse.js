import React from 'react';
import '../../styles/VideoCourse.css';
import ReactPlayer from 'react-player';

const VideoCourse = (values) => {
  return (
    <div className='video-container'>
      <div className='video-player' onContextMenu={(e) => {e.preventDefault()}}>
        <ReactPlayer 
          controls
          playing={true}
          width='75%'
          height='75%'
          url={values.link}
          config={{ file: { 
            attributes: {
              controlsList: 'nodownload'
            }
          }}}>        
        </ReactPlayer>
      </div>
      <div className="xl:ml-56 lg:ml-40 md:ml-28 sm:ml-20 text-center sm:text-left mb-4">
        <h2 className="text-first font-bold text-xl md:text-4xl">{values.title}</h2>
        <h3 className="text-gray-500 text-sm md:text-md">{values.subject}</h3>
        <h4 className="text-sm md:text-md pt-10">{values.info}</h4>
      </div>
    </div>
    
  );
}

export default VideoCourse;
