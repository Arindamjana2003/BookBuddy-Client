type greetings = 'Good Morning' | 'Good Noon' | 'Good Afternoon' | 'Good Evening' | 'Good Night';

export const TimeDescriptor = (date: Date = new Date()): greetings => {
  const time = date.getHours();

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
};
