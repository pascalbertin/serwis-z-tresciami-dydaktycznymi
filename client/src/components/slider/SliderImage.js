import React, { useState, useEffect } from 'react';
import foto1 from '../../assets/images/study.jpg';
import foto2 from '../../assets/images/words.jpg';

const SliderImage = () => {

  
}

// useEffect(() => {
//     fetch('https://serwis-z-tresciami.herokuapp.com/api/course/manageCourseBySubject?subject=' + 'Matematyka', 
//     {   
//         headers: {
//          'Accept': 'application/json',
//          'Content-Type': 'application/json'
//         }
//     })
//      .then((response) => {
//       if (!response.ok) {
//         throw new Error(
//           `This is an HTTP error: The status is ${response.status}`
//         );
//       }
//       return response.json();
//     })
//     .then((actualData) => console.log(actualData))
//     .catch((err) => {
//       console.log(err.message);
//     });
//   }, []);
// }

export default 
  [
    {
        id: 1,
        title: "Title1",
        author: "Adam",
        thumbnail: foto1,
    },
    {
        id: 2,
        title: "Title2",
        author: "Arthur",
        thumbnail: foto2,
    },
    {
        id: 3,
        title: "Title3",
        author: "Andrew",
        thumbnail: foto2,
    },
    {
        id: 4,
        title: "Title4",
        author: "Alex",
        thumbnail: foto2,
    },
];
