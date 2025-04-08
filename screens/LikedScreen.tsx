import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, useColorScheme, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '@/constants/Colors';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function LickedScreen() {
  const colorScheme = useColorScheme();
  const themeColor = Colors[colorScheme ?? 'light'];

  const books = [
    {
      image: {
        uri: 'https://thumbs.dreamstime.com/z/c-programming-code-abstract-technology-background-computer-software-coding-d-c-programming-code-abstract-technology-background-219889203.jpg',
      },
      name: 'C++',
      description: 'Authentic Guide to C programming',
      author: 'Yashavant Kanethkar',
    },
    {
      image: {
        uri: 'https://www.eginnovations.com/blog/wp-content/uploads/2019/06/how-to-troubleshoot-java-cpu.jpg',
      },
      name: 'JAVA',
      description: 'From the beginning to pro sixth edition',
      author: 'Ivor Horton',
    },
    {
      image: {
        uri: 'https://www.blogseite.com/wp-content/uploads/2023/12/python-img-1300x731.jpg',
      },
      name: 'PYTHON',
      description: 'Introduction to computation and programming using Python',
      author: 'John V. Guttag',
    },
    {
      image: {
        uri: 'https://th.bing.com/th/id/OIP.b9Y_P_oQMR-ShwWRelbsFgHaD_?w=1170&h=630&rs=1&pid=ImgDetMain',
      },
      name: 'AI',
      description: 'A guide to artificial intelligence for beginners',
      author: 'William Sullivan',
    },
    {
      image: {
        uri: 'https://www.devteam.space/wp-content/uploads/2021/11/How-to-Build-a-Mobile-App-With-React-Native.jpg',
      },
      name: 'REACT NATIVE',
      description: 'Abstract & Linear, Fifth Edition',
      author: 'Sk Mapa',
    },

    {
      image: {
        uri: 'https://cloudfoundation.com/blog/wp-content/uploads/2023/05/FEATURED-IMAGE-OF-PHP.jpg',
      },
      name: 'PHP',
      description: 'Abstract & Linear, Fifth Edition',
      author: 'Sk Mapa',
    },

    {
      image: {
        uri: 'https://thumbs.dreamstime.com/b/javascript-concept-blue-background-blue-text-44066030.jpg',
      },
      name: 'JAVASCRIPT',
      description: 'Abstract & Linear, Fifth Edition',
      author: 'Sk Mapa',
    },

  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: themeColor.background }]}
      contentContainerStyle={styles.grid}
    >
      {books.map((book, index) => (
        <View key={index} style={[styles.cardContainer, { backgroundColor: themeColor.surface }]}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: book.image.uri }}
              style={[styles.bookImage, { backgroundColor: themeColor.surface }]}
            />
            <TouchableOpacity
              style={[styles.roundButton, { backgroundColor: themeColor.background }]}
              onPress={() => Alert.alert('Heart Clicked!')}
            >
              <AntDesign name="heart" size={22} color={themeColor.textSecondary} />
            </TouchableOpacity>
          </View>
          <View style={[styles.textContainer, { backgroundColor: themeColor.surface }]}>
            <Text style={[styles.bookName, { color: themeColor.textPrimary }]}>
              {book.name} || {book.author}</Text>
              
            <Text style={[styles.description, { color: themeColor.textPrimary }]}>
              {book.description}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  grid: {
    paddingBottom: 150,
  },
  container: {
    flex: 1,
  },
  cardContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  imageContainer: {
    
  },
  bookImage: {
    width:'100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius:100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  roundButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    padding: 10,
  },
  bookName: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
    color: '#555',
    marginTop: 5,
  },
});
