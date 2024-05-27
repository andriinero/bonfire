import Colors from '@/constants/Colors';

export const getRandomBackgroundColorClass = () => {
  const colors = Object.values(Colors.BackgroundClasses);
  const randomIndex = Math.floor(colors.length * Math.random());

  return colors[randomIndex];
};
