import { useWindowDimensions } from 'react-native';

const useScreenSize = () => {
  const { width } = useWindowDimensions();
  const cardMargin = 10;
  const numColumns = width > 768 ? 6 : width > 480 ? 5 : 4;
  const cardWidth = (width - (numColumns + 1) * cardMargin) / numColumns;
  const cardHeight = cardWidth * 1.5;

  return {
    cardMargin,
    numColumns,
    cardWidth,
    cardHeight,
  };
};

export default useScreenSize;
