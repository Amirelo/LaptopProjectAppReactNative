import React, {useEffect} from 'react';
import CustomView from '../../../components/atoms/CustomView';
import CustomButtonBare from '../../../components/atoms/CustomButtonBare';
import CustomImage from '../../../components/atoms/CustomImage';
import AccountTab from '../../../components/molecules/AccountTab';

const ProfileScreen = ({route, navigation}) => {
  const {userInfo} = route.params;
  console.log(userInfo);

  const onGoBack = (data, type) => {
    console.log('goback');
    switch (type) {
      case 'USERNAME':
        userInfo.username = data;
        break;
      case 'FULLNAME':
        userInfo.fullname = data;
        break;
      case 'IMAGELINK':
        userInfo.imageLink = data;
        break;
      case 'BIRTHDAY':
        userInfo.birthday = data;
        break;
      case 'GENDER':
        userInfo.gender = data;
        break;
      case 'STATUS':
        userInfo.status = data;
        break;
      case 'PHONENUMBER':
        userInfo.phonenumber = data;
        break;
      default:
        break;
    }
    route.params.onGoBackAccount(userInfo);
  };

  useEffect(() => {
    console.warn('resfresh');
    onGoBack();
  }, []);

  const onAccountTabPressed = type => {
    navigation.navigate('Update User Information', {
      type: type,
      email: userInfo.email,
      onGoBack,
    });
  };

  return (
    <CustomView scrollable={true}>
      <CustomButtonBare>
        <CustomImage
          source={userInfo.imageLink}
          linkType={'uri'}
          type={'logo'}
          marginTop={50}
        />
      </CustomButtonBare>

      <AccountTab
        type={'profile'}
        onPress={() => onAccountTabPressed('USERNAME')}
        title={'Username'}
        subtitle={userInfo.username}
      />
      <AccountTab
        type={'profile'}
        onPress={() => onAccountTabPressed('PHONENUMBER')}
        title={'Phone number'}
        subtitle={userInfo.phonenumber}
      />
      <AccountTab
        type={'profile'}
        onPress={() => onAccountTabPressed('BIRTHDAY')}
        title={'Birthday'}
        subtitle={userInfo.birthday}
      />
    </CustomView>
  );
};

export default ProfileScreen;
