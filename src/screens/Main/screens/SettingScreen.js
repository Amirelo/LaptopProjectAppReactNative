import React from 'react';
import {CustomText, CustomView} from '../../../components/atoms';
import CustomButton from '../../../components/molecules/CustomButton';
import {AuthContext} from '../../Auth/AuthContext';
import OptionsButton from '../../../components/molecules/OptionsButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingScreen = () => {
  const [showLanguageOption, setShowLanguageOption] = React.useState(false);
  const [curLang, setCurLang] = React.useState('');
  const {language, changeLanguage} = React.useContext(AuthContext);

  const getCurLang = async () => {
    let curLang = await AsyncStorage.getItem('language');
    availableLanguage.map(item => {
      if (item.code == curLang) {
        setCurLang(item.lang);
      }
    });
  };

  const availableLanguage = [
    {lang: 'English', code: 'en'},
    {lang: 'Deutsch', code: 'de'},
    {lang: 'Tiếng Việt', code: 'vn'},
    {lang: 'Frankreich', code: 'fr'},
    {lang: 'ジャパニーズ', code: 'ja'},
  ];

  const onOptionPressed = lang => {
    changeLanguage(lang);
    setShowLanguageOption(false);
  };


  React.useEffect(() => {
    getCurLang();
  });

  return (
    <CustomView>
      <CustomText
        textStyle={'subtitleBold'}
        alignSelf={'flex-start'}
        customStyles={{marginStart: '5%'}}>
        {language.settings_text_language}
      </CustomText>
      <CustomButton onPress={setShowLanguageOption} type={'social'}>
        {curLang}
      </CustomButton>
      {showLanguageOption ? (
        <OptionsButton onBackgroundPressed={setShowLanguageOption}>
          <CustomText textStyle={'normalBold'}>Language</CustomText>
          {availableLanguage.map((item, index) => {
            return (
              <CustomButton
                onPress={() => onOptionPressed(item.code)}
                type={'tertiary'}>
                {item.lang}
              </CustomButton>
            );
          })}
        </OptionsButton>
      ) : (
        <></>
      )}
    </CustomView>
  );
};

export default SettingScreen;
