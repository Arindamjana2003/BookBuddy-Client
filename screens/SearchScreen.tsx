import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function SearchScreen() {
  const colorScheme = useColorScheme();
  const themeColor = Colors[colorScheme ?? 'light'];

  const books = [
    {
      image: {
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY6m4L92Nc5ci_goy7928WoAgBfl5Sn5vyWw&s',
      },
      name: 'C ',
      description: 'Authentic Guide to C programmimg',
      author: ' Yashavant Kanethkar',
      date: '2023-04-01',
      rating: 4.5,
    },
    {
      image: {
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwftdwzSOyRt9okVxJBEvaCKH7Bp3n9mPC1w&',
      },
      name: 'Let Us C',
      description: 'From the beginning to pro sixth edition',
      author: 'Ivor horton',
      date: '2023-03-15',
      rating: 4.0,
    },
    {
      image: {
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN8iyuNyKoBa7jzoOY68Bi1LYgl3c9cR0bNg&s',
      },
      name: 'Python',
      description: 'Introduction to computation and programmimg using Python',
      author: 'Jhon V.Guttak',
      date: '2023-03-20',
      rating: 4.2,
    },
    {
      image: {
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpKEIeqZ4I0XTZL2KDuVo4q_FqgrtHgg31Uw&s',
      },
      name: 'Javascript',
      description: 'javascript language for absolute beginners',
      author: 'Willium Sulivan',
      date: '2023-03-25',
      rating: 4.3,
    },
    {
      image: {
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdAWrjRl_ukTlrgXMVRDQqlF52GhR09ISWSw&s',
      },
      name: 'Algebra',
      description: 'Abstact & Linear, Fifth Edition',
      author: 'Sk Mapa',
      date: '2023-03-30',
      rating: 4.4,
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeColor.background }]}>
      {books.map((book, index) => (
        <View key={index} style={[styles.bookContainer, { backgroundColor: themeColor.surface }]}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: book.image.uri }}
              style={[styles.bookImage, { backgroundColor: themeColor.surface }]}
            />
            <View style={styles.likeIcon}>
              <AntDesign name="heart" size={24} color={themeColor.primaryVariant} />
            </View>
            <View style={styles.ratingIcon}>
              <AntDesign name="star" size={24} color={themeColor.primaryVariant} />
              <Text style={styles.ratingText}>{book.rating}</Text>
            </View>
          </View>
          <View style={[styles.textContainer, { backgroundColor: themeColor.surface }]}>
            <Text style={[styles.bookName, { color: themeColor.textPrimary }]}>{book.name}</Text>
            <Text style={[styles.bookDescription, { color: themeColor.textPrimary }]}>
              {book.description}
            </Text>
            <View style={styles.footer}>
              <Text style={[styles.author, { color: themeColor.textPrimary }]}>{book.author}</Text>
              <View style={styles.dateContainer}>
                <AntDesign name="calendar" size={18} color={themeColor.textPrimary} />
                <Text style={[styles.date, { color: themeColor.textPrimary }]}>{book.date}</Text>
              </View>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bookContainer: {
    marginBottom: 20,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
  },
  bookImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  likeIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: '#00000080',
    padding: 5,
    borderRadius: 15,
  },
  ratingIcon: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00000080',
    padding: 5,
    borderRadius: 15,
  },
  ratingText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 16,
  },
  textContainer: {
    padding: 15,
  },
  bookName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bookDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  author: {
    fontSize: 16,
    fontWeight: '500',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 16,
    fontWeight: '400',
    color: '#999',
    marginLeft: 5,
  },
});
