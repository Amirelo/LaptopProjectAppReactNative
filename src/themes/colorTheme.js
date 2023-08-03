import {useColorScheme} from 'react-native';

const Colors = {
  light: {
    textColor: '#000',
    textVariantColor: '#FAF7F4',
    textConstrastColor: '#fff',
    backgroundColor: '#D0C2AE',
    noneColor: '#00000000',
    backgroundInputColor: '#E4DACB',
    borderColor: '#ECE2D3',
    primaryColor: '#967259',
    primaryLightColor: '#EBF0FF',
    errColor: '#F71B38',
    warnColor: '#B29784',
    successColor: '#03B700',
    processColor: '#0F01B5',
    secondaryColor: '#F78802',
  },
  green: {
    textColor: '#000',
    textVariantColor: '#015278',
    textConstrastColor: '#fff',
    backgroundColor: '#97A97C',
    noneColor: '#00000000',
    backgroundInputColor: '#E9F5DB',
    borderColor: '#E1E1E1',
    primaryColor: '#02A9F7',
    primaryLightColor: '#EBF0FF',
    errColor: '#F71B38',
    warnColor: '#ABA40A',
    successColor: '#03B700',
    processColor: '#0F01B5',
    secondaryColor: '#F78802',
  },
  sky: {
    textColor: '#000',
    textVariantColor: '#015278',
    textConstrastColor: '#fff',
    backgroundColor: '#AAC7DB',
    noneColor: '#00000000',
    backgroundInputColor: '#F7F2EB',
    borderColor: '#E1E1E1',
    primaryColor: '#02A9F7',
    primaryLightColor: '#EBF0FF',
    errColor: '#F71B38',
    warnColor: '#ABA40A',
    successColor: '#03B700',
    processColor: '#0F01B5',
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
  const colors = Colors.light;
  return colors;
};

export default useThemeColors;
