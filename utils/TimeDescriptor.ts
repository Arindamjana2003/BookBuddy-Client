export const TimeDescriptor = () => {
  const time = new Date().getHours();  
  console.log(time);

  
  if (time >= 5 && time < 12) {
    return 'Good Morning';  
  } else if (time >= 12 && time < 16) {
    return 'Good Noon';     
  } else if (time >= 16 && time < 18) {
    return 'Good Afternoon';  
  } else if (time >= 18 && time < 20) {
    return 'Good Evening';    
  } else {
    return 'Good Night';     
  }
}
