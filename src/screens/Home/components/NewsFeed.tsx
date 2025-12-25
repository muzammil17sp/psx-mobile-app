import {  FlatList } from 'react-native';
import React from 'react';
import { news } from '../../../data/news';
import NewsCard from './NewsCard';

const NewsFeed = () => {
  return (
    <FlatList
      data={news}
      keyExtractor={item => item.article_id}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.5}
      onEndReached={() => console.log('Load more articles')} 
      renderItem={({ item }) => <NewsCard item={item} />}
    />
  );
};

export default NewsFeed;
