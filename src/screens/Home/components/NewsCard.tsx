import {
  View,
  Text,
  StyleSheet,
  Linking,
  Image,
  Pressable,
} from 'react-native';
import React from 'react';

interface News {
  item: {
    title: string;
    thumbnail_url: string;
    link: string;
    source_name: string;
    source_logo_url: string;
    snippet: string;
  };
}

const NewsCard = ({ item }: News) => {
  const navigateToNews = (url: string) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) Linking.openURL(url);
    });
  };

  return (
    <Pressable
      onPress={() => navigateToNews(item.link)}
      style={styles.card}
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: item.thumbnail_url }}
          resizeMode="cover"
        />
      </View>
      
      <View style={styles.textWrapper}>
        <View style={styles.contentSection}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {item.snippet}
          </Text>
        </View>

        <View style={styles.sourceContainer}>
          <Image
            source={{ uri: item.source_logo_url }}
            style={styles.sourceLogo}
          />
          <Text style={styles.sourceText}>
            {item.source_name}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#1E1E1E',
    paddingBottom: 12,
    gap: 12,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#2C2C2C', 
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  contentSection: {
    flex: 1,
    flexDirection: 'row', flexWrap: 'wrap', width: '100%'
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#F5F5F5', 
    lineHeight: 20,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#BDBDBD', 
    lineHeight: 18,
  },
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  sourceLogo: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 6,
    backgroundColor: '#FFF',
  },
  sourceText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#757575',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

export default NewsCard;