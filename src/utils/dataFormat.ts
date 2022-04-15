import { Dimensions, PixelRatio } from 'react-native';

const width = Dimensions.get('window').width;

/**
 * use for responsive scaling of font size
 * depends on device width
 * base model width is iphone 8
 */
export const fontScale = (size: number) => {
  const maxSize = size + 4;
  const scale = width / 375;
  const newSize = size * scale;

  const value = Math.round(PixelRatio.roundToNearestPixel(newSize));
  const ret = value > maxSize ? maxSize : value;

  return ret;
};

/**
 * use for responsive scaling of view size
 * depends on device width
 * base model width is iphone 8
 */
export const responsiveScale = (size: number) => {
  const maxSize = size * 2;
  const scale = width / 375;
  const newSize = size * scale;

  const value = Math.round(PixelRatio.roundToNearestPixel(newSize));
  const ret = value > maxSize ? maxSize : value;

  return ret;
};
