import React, { useState } from 'react';

import classes from './Lightbox.module.css';

//MAIN LIGHTBOX
//Holds Images Cards and Lightbox
//this is where all of our logic will live
const Lightbox = props => {
  const [currentIndex, setCurrentIndex] = useState(props.initialIndex);

  //show next image in lightbox
  const showNext = (e) => {
    e.stopPropagation();
    if (currentIndex >= props.images.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  //show previous image in lightbox
  const showPrev = (e) => {
    e.stopPropagation();
    if (currentIndex === 0) {
      setCurrentIndex(props.images.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };
  

  return (
    <div className={classes.Lightbox} onClick={props.toggleLightbox}>
      <div className={classes.lightboxContent}>
        <div onClick={showPrev} className={[classes.button, classes.prev].join(' ')}>
          <p>⭠</p>
        </div>
        <img className={classes.lightboxImage} src={"http://localhost:5000/" + props.images[currentIndex].url} />
        <div onClick={showNext} className={[classes.button, classes.next].join(' ')}>
          <p>⭢</p>
        </div>
      </div>
    </div>
  );
}

export default Lightbox;
