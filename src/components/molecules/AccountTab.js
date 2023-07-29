import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import * as images from '../../assets/images';
import CustomImage from '../atoms/CustomImage';
import CustomText from '../atoms/CustomText';
import CustomButtonBare from '../atoms/CustomButtonBare';
import CustomView from '../atoms/CustomView';
import {borderTheme} from '../../themes/borderTheme';

const AccountTab = ({
  title,
  subtitle,
  onPress,
  isHighlight,
  spacingTop,
  type,
  source,
}) => {
  return (
    <CustomButtonBare onPress={onPress}>
      <CustomView
        type={'accountTab'}
        backgroundColor={'backgroundInput'}
        borderStyle={borderTheme.textInput}>
        <CustomView backgroundColor={'none'} type={'rowJustify'}>
          {type == 'usertab' ? (
            <CustomImage source={source} linkType={'uri'} type={'logo'} />
          ) : (
            <></>
          )}
          <CustomView backgroundColor={'none'} type={'left'}>
            <CustomText customStyles={[]} marginTop={0}>{title}</CustomText>
            {type == 'profile' ? (
              <CustomText>{subtitle}</CustomText>
            ) : (
              <CustomText>{subtitle}</CustomText>
            )}
          </CustomView>
          <CustomImage type={'searchBarIcon'} source={images.ic_arrow_right} />
        </CustomView>
      </CustomView>
    </CustomButtonBare>
  );
};

export default AccountTab;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    maxWidth: 343,
    borderRadius: 10,
    backgroundColor: '#FBFBFB',
    borderColor: '#EBF0FF',
    borderWidth: 1,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: '50%',
  },
  userImage: {
    marginEnd: 8,
  },
  textContainer: {
    flex: 1,
  },
  textContainerRow: {
    flexDirection: 'row',
  },
});
