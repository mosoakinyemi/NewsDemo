import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {Dimensions} from 'react-native';

export const hp = (num) => {
  return heightPercentageToDP((num / 812) * 100);
};

export const wp = (num) => {
  return widthPercentageToDP((num / 375) * 100);
};

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

export const baseURL = 'https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/';

export const colors = {
  primary: 'purple',
  timeTextColor: '#fe346e',
  accent: '#fe346e',
  accent2: '#00bdaa',
};
