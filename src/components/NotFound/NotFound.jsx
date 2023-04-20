import { React, useState, useEffect, useMemo } from 'react';
import './NotFound.css';
import notfound1 from '../../resources/img/404/notfound1.png';
import notfound2 from '../../resources/img/404/notfound2.png';
import notfound3 from '../../resources/img/404/notfound3.png';
import notfound4 from '../../resources/img/404/notfound4.png';
import notfound5 from '../../resources/img/404/notfound5.png';

const NotFound = () => {
  const images = useMemo(
    () => [notfound1, notfound2, notfound3, notfound4, notfound5],
    []
  );

  const [selectedImageIndex, setSelectedImageIndex] = useState(
    Math.floor(Math.random() * images.length)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSelectedImageIndex(Math.floor(Math.random() * images.length));
    }, 3600000 + Math.floor(Math.random() * 3600000)); // Random interval between 1-2 hours
    return () => clearInterval(intervalId);
  }, [images]);

  return (
    <div className="not-found">
      <div
        className="mainPNG"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img src={images[selectedImageIndex]} alt="notfound" />
      </div>
    </div>
  );
};

export default NotFound;
