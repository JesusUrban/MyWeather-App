import React, { useEffect } from 'react';

const TimeBasedBackground = () => {
  const getCurrentTimePeriod = () => {
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 12) {
      return 'morning';
    } else if (hours >= 12 && hours < 17) {
      return 'afternoon';
    }
    return 'default';  
  };

  const timePeriod = getCurrentTimePeriod();

  const getBackgroundImage = () => {
    switch (timePeriod) {
      case 'morning':
        return 'https://th.bing.com/th/id/OIP.fmE37i7uwD7GrmdwkhepFAHaEK?pid=ImgDet&w=474&h=266&rs=1';
      case 'afternoon':
        return 'https://th.bing.com/th/id/R.bdafbe2ab1ce299f89f746f6b844df78?rik=IyAoBkVehkegIQ&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f07%2fWeather-Desktop-Wallpaper.jpg&ehk=EO7m3dR%2fDSolkW4sXgO5kgGDoXNknoANzM6HQThE%2b%2bs%3d&risl=&pid=ImgRaw&r=0';
      default:
        return '/bg.jpg';  
    }
  };

  useEffect(() => {
    const backgroundImage = getBackgroundImage();
    document.getElementById('root').style.backgroundImage = `url(${backgroundImage})`;
  }, [timePeriod]);

  return (
    <div>
      
    </div>
  );
};

export default TimeBasedBackground;