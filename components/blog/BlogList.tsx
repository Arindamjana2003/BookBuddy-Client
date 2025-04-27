import { RefreshControl, StyleSheet, Text, useColorScheme, View } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { Blog } from '@/types/blog';
import { FlashList } from '@shopify/flash-list';
import BlogCard from './BlogCard';

interface BlogListProps {
  loading: boolean | null;
  blogs: Blog[];
  onRefresh: () => void; // Replace with your actual blog type
}

const BlogList: React.FC<BlogListProps> = ({ loading, blogs, onRefresh }) => {
  const theme = Colors[useColorScheme() ?? 'light'];

  return (
    <FlashList
      data={blogs}
      renderItem={({ item }) => <BlogCard item={item} />}
      keyExtractor={(item) => item._id}
      estimatedItemSize={200}
      contentContainerStyle={{
        paddingBottom: 100,
      }}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={{ color: theme.textPrimary }}>
            {loading ? 'Loading...' : 'No blogs available'}
          </Text>
        </View>
      }
      refreshControl={
        <RefreshControl
          refreshing={!!loading}
          onRefresh={onRefresh}
          tintColor={theme.textPrimary}
        />
      }
    />
  );
};

export default BlogList;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
});
