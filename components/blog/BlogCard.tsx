import { Colors } from '@/constants/Colors';
import { Blog } from '@/types/blog';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons (like, comment, share)
import ThemeText from '../global/TheamText';
import { Fonts } from '@/constants/Fonts';
import { router } from 'expo-router';

const BlogCard = ({ item }: { item: Blog }) => {
  const { title, description, image, user } = item;

  const [likeCount, setLikeCount] = React.useState(0); // State for like count
  const [isLiked, setIsLiked] = React.useState(false); // State for like status

  const theme = Colors[useColorScheme() ?? 'light'];

  function handleLike() {
    setIsLiked(!isLiked); // Toggle like status
    if (isLiked) {
      setLikeCount(likeCount - 1); // Decrease like count
    } else {
      setLikeCount(likeCount + 1); // Increase like count
    }
  }

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.background }]}
      onPress={() => router.push(`/(protected)/blog/${item._id}`)} // Navigate to blog details
    >
      {image?.url && <Image source={{ uri: image.url }} style={styles.image} />}

      <View style={styles.content}>
        {/* Blog Title */}
        <ThemeText font={Fonts.PoppinsSemiBold} style={[styles.title]} numberOfLines={2}>
          {title}
        </ThemeText>

        {/* Blog Description */}
        <ThemeText style={[styles.description, { color: theme.textPrimary }]} numberOfLines={3}>
          {description}
        </ThemeText>

        {/* Posted By Section */}
        <View style={styles.postedByContainer}>
          {user?.profile_pic?.url ? (
            <Image
              source={{ uri: user?.profile_pic?.url }}
              style={{
                height: 25,
                width: 25,
                borderRadius: 50,
              }}
              resizeMode="cover"
            />
          ) : (
            <Ionicons name="person-circle-outline" size={30} color={theme.gray} />
          )}
          <Text style={[styles.postedByText, { color: theme.textSecondary }]}>
            Posted by {user?.name || 'Anonymous'}
          </Text>
        </View>

        {/* Like, Comment, Share Buttons */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionButton} onPress={() => handleLike()}>
            <Ionicons
              name={isLiked ? 'heart' : 'heart-outline'}
              size={22}
              color={isLiked ? theme.error : theme.gray}
            />
            <Text style={[styles.actionText, { color: isLiked ? theme.error : theme.gray }]}>
              {likeCount} Like
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.actionButton}
            onPress={() => console.log('Comment', item._id)}
          >
            <Ionicons name="chatbubble-ellipses-outline" size={22} color={theme.gray} />
            <Text style={[styles.actionText, { color: theme.gray }]}>Comment</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => console.log('Share', item._id)}
          >
            <Ionicons name="share-social-outline" size={22} color={theme.gray} />
            <Text style={[styles.actionText, { color: theme.gray }]}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BlogCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    marginVertical: 10,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  image: {
    width: '100%',
    height: 180,
  },
  placeholderImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#555',
    fontSize: 16,
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  postedByContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  postedByText: {
    marginLeft: 6,
    fontSize: 14,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
  },
});
