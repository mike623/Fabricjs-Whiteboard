import React from 'react';
export const Video = ({ videoRef, ...props }) => {
  return (
    <video ref={videoRef} {...props}>
      <source id="mp4" src="http://media.w3.org/2010/05/sintel/trailer.mp4" type="video/mp4" />
      <source id="webm" src="http://media.w3.org/2010/05/sintel/trailer.webm" type="video/webm" />
      <source id="ogv" src="http://media.w3.org/2010/05/sintel/trailer.ogv" type="video/ogg" />
    </video>
  );
};
