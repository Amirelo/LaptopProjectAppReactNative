import {View, Text, FlatList} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {CustomText, CustomView} from '../../../components/atoms';
import {MainContext} from '../MainContext';
import {deviceWidth} from '../../../utils/helper';
import CommentItem from '../../../components/molecules/CommentItem';

const ProductCommentScreen = ({route}) => {
  const {onGetProductRatingsByID} = useContext(MainContext);
  const {productID} = route.params;
  const [comments, setComments] = useState({});

  const initData = async () => {
    const res = await onGetProductRatingsByID(productID);
    setComments(res.data);
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <CustomView>
      <FlatList
        width={deviceWidth}
        marginTop={32}
        contentContainerStyle={{gap: 16, alignItems: 'center'}}
        showsHorizontalScrollIndicator={false}
        data={comments}
        initialNumToRender={3}
        keyExtractor={item => item.ratingID}
        renderItem={({item}) => {
          return <CommentItem data={item} />;
        }}
      />
    </CustomView>
  );
};

export default ProductCommentScreen;
