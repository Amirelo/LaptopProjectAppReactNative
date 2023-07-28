import {StyleSheet, View} from 'react-native';
import React from 'react';
import CustomText from '../atoms/CustomText';
import CustomButton from './CustomButton';

const SortOption = ({setSortOption, setSortPressed}) => {
  const changeOption = type => {
    setSortOption(type);
    setSortPressed(false);
  };

  return (
    <View style={styles.container}>
      <CustomText
        value={'Sort by'}
        customStyles={styles.spacing}
        fontWeight={'heavy'}
        fontSize={'title'}
      />
      <CustomButton
        value={'Popularity'}
        onPress={() => changeOption(1)}
        customStyles={styles.spacing}
      />
      <CustomButton
        value={'Newest'}
        onPress={() => changeOption(2)}
        customStyles={styles.spacing}
      />
      <CustomButton
        value={'Price: low to high'}
        onPress={() => changeOption(3)}
        customStyles={styles.spacing}
      />
      <CustomButton
        value={'Price: high to low'}
        onPress={() => changeOption(4)}
        customStyles={styles.spacing}
      />
    </View>
  );
};

export default SortOption;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    justifyContentL: 'center',
    alignItems: 'center',
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
  },
  spacing: {
    padding: 16,
  },
});
