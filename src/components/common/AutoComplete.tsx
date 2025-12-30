import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
  Easing,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import { news } from '../../data/news';

interface Props {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

const AutoComplete = (props: Props) => {
  const listHeight = useRef(new Animated.Value(0)).current;
  const listOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (props.value !== '' && news.length > 0) {
      Animated.parallel([
        Animated.timing(listHeight, {
          toValue: 300,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }),
        Animated.timing(listOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(listHeight, {
          toValue: 0,
          duration: 250,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: false,
        }),
        Animated.timing(listOpacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [props.value]);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={props.value}
        placeholder="Search stock symbol..."
        placeholderTextColor="#757575"
        onChangeText={(e: string) => props.onChange(e)}
      />
      {props.value !== '' && news.length && (
        <Animated.View
          style={[
            styles.optionListContainer,
            {
              height: listHeight,
              opacity: listOpacity,
              transform: [
                {
                  translateY: listOpacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-10, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <FlatList
            data={news}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()} // Added keyExtractor
            renderItem={() => (
              <TouchableOpacity style={styles.optionContainer}>
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.image}
                    resizeMode="contain"
                    source={{
                      uri: 'https://www.lucky-cement.com/wp-content/uploads/2017/02/lucky-logo.png',
                    }}
                  />
                </View>
                <Text style={styles.title}>HUBCO</Text>
              </TouchableOpacity>
            )}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default AutoComplete;

const styles = StyleSheet.create({
  container: {
    margin: 12,
    position:"relative"
  },
  input: {
    backgroundColor: '#1E1E1E',
    padding: 16,
    color: '#F5F5F5',
    borderRadius: 6,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#2C2C2C',
  },
  optionListContainer: {
    backgroundColor: '#1E1E1E',
    marginTop: 10,
    borderRadius: 6,
    maxHeight: 300,
    paddingVertical: 4,
    position:"absolute",
    width:"100%",
    zIndex: 100,
    top: 50,

  },
  optionContainer: {
    flexDirection: 'row',
    gap: 6,
    marginVertical: 4,
    padding: 10,
  },
  imageContainer: {
    height: 24,
    width: 24,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#F5F5F5',
    lineHeight: 20,
    marginBottom: 4,
  },
});
