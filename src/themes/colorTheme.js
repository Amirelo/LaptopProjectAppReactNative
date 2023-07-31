import {useColorScheme} from 'react-native';

const Colors = {
  light: {
    textColor: '#000',
    textVariantColor: '#015278',
    textConstrastColor: '#fff',
    backgroundColor: '#fff',
    noneColor: '#00000000',
    backgroundInputColor: '#F5F5F5',
    borderColor: '#E1E1E1',
    primaryColor: '#02A9F7',
    primaryLightColor: '#EBF0FF',
    errColor: '#F71B38',
    warnColor: '#ABA40A',
    secondaryColor: '#F78802',
  },
  dark: {
    textColor: '#fff',
    textVariantColor: '#015278',
    textConstrastColor: '#fff',
    backgroundColor: '#000',
    primaryColor: '#02A9F7',
    errColor: '#F71B38',
    warnColor: '#ABA40A',
    secondaryColor: '#F78802',
  },
};

const useThemeColors = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  return colors;
};

export default useThemeColors;
