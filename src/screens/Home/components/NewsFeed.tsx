import { FlatList } from 'react-native';
import React from 'react';
import NewsCard from './NewsCard';
import { useGetNews } from '../../../hooks/useGetNews';

const NewsFeed = () => {
  const { data, isLoading } = useGetNews();

  if (isLoading) return null;

  return (
    <FlatList
      data={data.data.data}
      keyExtractor={item => item.article_id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <NewsCard item={item} />}
    />
  );
};

export default NewsFeed;
